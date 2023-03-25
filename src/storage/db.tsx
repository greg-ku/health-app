import { useState, useEffect, useRef } from 'react'
import { sub, startOfDay, parseISO, isBefore, isAfter } from 'date-fns'

import { fillDataInPeriod } from '/src/utils/helpers'

let db = {
  instance<IDBDatabase>: null,
  handleVersionChange: () => {
    db.instance.close()
    console.log('A new version of this page is ready. Please reload or close this tab!')
  }
}

const getDB = (): Promise<IDBDatabase> => {
  if (db.instance) {
    return Promise.resolve(db.instance)
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('healthAppDb', 1)
    request.onerror = (e) => reject('db open error')
    request.onsuccess = (e) => {
      // console.log('db success')
      db.instance = e.target.result
      db.instance.onversionchange = db.handleVersionChange
      resolve(db.instance)
    }
    request.onupgradeneeded = (e) => {
      // All other databases have been closed. Set everything up.
      const db: IDBDatabase = e.target.result

      const objectStore: IDBObjectStore = db.createObjectStore('fitness', { keyPath: 'date' })
    }
    request.onblocked = () => {
      console.error('Db blocked. Please close all other tabs with this site open!')
    }
  })
}

export const readDbByKey = async (objectStoreName: string, key: string): Promise<any> => {
  const db = await getDB()
  const transaction = db.transaction([objectStoreName])
  const objectStore = transaction.objectStore(objectStoreName)
  const request = objectStore.get(key)
  return new Promise((resolve, reject) => {
    request.onerror = (e) => reject('read db error')
    request.onsuccess = (e) => {
      // console.log('read success', e.target.result)
      resolve(e.target.result || null)
    }
  })
}

interface IKeyRange {
  start: string | number | null
  due: string | number | null
}

export const readDbByKeyRange = async (objectStoreName: string, range: IKeyRange): Promise<any> => {
  const db = await getDB()
  const transaction = db.transaction([objectStoreName])
  const objectStore = transaction.objectStore(objectStoreName)
  const results = []
  return new Promise((resolve, reject) => {
    let keyRange
    if (range.start !== null && range.due !== null) {
      keyRange = IDBKeyRange.bound(range.start, range.due)
    } else if (range.due !== null) {
      keyRange = IDBDatabase.upperBound(range.due)
    } else if (range.start !== null) {
      keyRange = IDBDatabase.lowerBound(range.start)
    } else {
      reject('key range error')
    }
    objectStore.openCursor(keyRange).onsuccess = (e) => {
      const cursor = e.target.result
      if (cursor) {
        results.push(cursor.value)
        cursor.continue()
      } else {
        resolve(results)
      }
    }
  })
}

export const saveToDb = async (objectStoreName: string, data: any): Promise<any> => {
  const db = await getDB()
  const transaction = db.transaction([objectStoreName], 'readwrite')
  const objectStore = transaction.objectStore(objectStoreName)
  const savedData = { ...data, createdAt: data?.createdAt || new Date().toISOString() }
  const request = data?.createdAt ? objectStore.put(savedData) : objectStore.add(savedData)
  return new Promise((resolve, reject) => {
    request.onerror = (e) => reject('write db error')
    request.onsuccess = (e) => {
      // console.log('write success', e.target.result)
      DbObserver.emit(objectStoreName, savedData)
      resolve(e.target.result || null)
    }
  })
}

interface IObserverInstance {
  objectStoreName: string
  id: string
  callback: (data: any) => void
}

export class DbObserver {
  static observers: IObserverInstance[] = []

  static subscribe(objectStoreName: string, callback: (data: any) => void): string {
    const id = crypto.randomUUID()
    DbObserver.observers.push({ id, objectStoreName, callback })
    return id
  }

  static unsubscribe(id: string) {
    DbObserver.observers = DbObserver.observers.filter((observer) => observer.id !== id)
  }

  static emit(objectStoreName: string, data: any) {
    DbObserver.observers.forEach((observer) => {
      if (observer.objectStoreName === objectStoreName) {
        observer.callback(data)
      }
    })
  }
}

export const useDateDataByDate = <DataType>(objectStoreName: string, date: Date) => {
  const [data, setData] = useState<DateType, null>(null)
  useEffect(() => {
    let flag = true
    const readDataByDate = async () => {
      const dataFromDb = await readDbByKey(objectStoreName, date.toISOString())
      if (flag) {
        setData(dataFromDb)
      }
    }
    readDataByDate()
    return () => {
      flag = false
    }
  }, [date])
  return [data, setData]
}

const getStartDate = (period: PeriodTypes, due: Date) => {
  switch (period) {
    case '7days': return sub(due, { days: 7 })
    case '30days': return sub(due, { months: 1 })
    case 'aSeason': return sub(due, { months: 3 })
    case 'aYear': return sub(due, { years: 1 })
    case 'all': return null
    default: throw new Error('unexpected period')
  }
}

// only work with objetStore that key is `date`
const useObserveredDbDateDataList = (initialValue = [], objectStoreName: string) => {
  const [list, setList] = useState(initialValue)

  const observerIdRef = useRef<string, null>(null)
  useEffect(() => {
    const callback = (data) => {
      if (list.length < 2) {
        return
      }
      const target = parseISO(data.date)
      const first = parseISO(list[0].date)
      const last = parseISO(list[list.length - 1].date)
      if (!isBefore(target, first) && !isAfter(target, last)) {
        const updatedList = list
          .map((origin) => origin.date === data.date ? data : origin)
        setList(updatedList)
      }
    }
    observerIdRef.current = DbObserver.subscribe(objectStoreName, callback)

    return () => {
      DbObserver.unsubscribe(observerIdRef.current)
    }
  }, [list])

  return [list, setList]
}

export const useDateDataListByPeriod = (objectStoreName: string, period: PeriodTypes, now: Date, initialValue = []) => {
  const [dataList, setDataList] = useObserveredDbDateDataList(initialValue, objectStoreName)
  useEffect(() => {
    let flag = true
    const readDataListByRange = async () => {
      const due = startOfDay(now)
      const start = getStartDate(period, due)
      const dataListFromDb = await readDbByKeyRange(
        objectStoreName, { start: start?.toISOString(), due: due.toISOString() }
      )
      if (flag) {
        const resultList = fillDataInPeriod(period, due, dataListFromDb)
        setDataList(resultList)
      }
    }
    readDataListByRange()
    return () => {
      flag = false
    }
  }, [period])

  return dataList
}
