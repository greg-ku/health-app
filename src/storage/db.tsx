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

export const readFromDb = async (objectStoreName: string, key: string): Promise<any> => {
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

export const saveToDb = async (objectStoreName: string, data: any): Promise<any> => {
  const db = await getDB()
  const transaction = db.transaction([objectStoreName], 'readwrite')
  const objectStore = transaction.objectStore(objectStoreName)
  const request = data?.createdAt
    ? objectStore.put(data)
    : objectStore.add({ ...data, createdAt: new Date().toISOString() })
  return new Promise((resolve, reject) => {
    request.onerror = (e) => reject('write db error')
    request.onsuccess = (e) => {
      // console.log('write success', e.target.result)
      resolve(e.target.result || null)
    }
  })
}
