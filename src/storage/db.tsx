let db: IDBDatabase = null

const getDB = (): Promise<IDBDatabase> => {
  if (db) {
    return Promise.resolve(db)
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('healthAppDb', 1)
    request.onerror = (e) => reject('db open error')
    request.onsuccess = (e) => {
      // console.log('db success')
      db = e.target.result
      resolve(db)
    }
    request.onupgradeneeded = (e) => {
      const db: IDBDatabase = e.target.result

      const objectStore: IDBObjectStore = db.createObjectStore('fitness', { keyPath: 'date' })
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
