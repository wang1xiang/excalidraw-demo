import Dexie, { Table } from 'dexie'
import { FILES_STORE } from '../excalidraw/constants';
import { Files } from '../excalidraw/types';

export class FilesClassedDexie extends Dexie {
  [FILES_STORE]!: Table<Files>

  constructor() {
    super('files-db')
    this.version(1).stores({
      [FILES_STORE]: '++id,created,dataURL,lastRetrieved,mimeType', // Primary key and indexed props
    })
  }
}

export const db = new FilesClassedDexie()
