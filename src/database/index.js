import Dexie from 'dexie'
import database from 'src/config/database.json'
export class Database extends Dexie {
  constructor () {
    super(database.name)
    this.version(1).stores(database.entities)
  }
}

export const DB = new Database()
window.dexie = Dexie
