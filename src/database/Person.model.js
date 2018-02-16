import { DB } from 'src/database'
import moment from 'moment'

export class PersonModel {
  constructor () {
    this.table = DB.table('persons')
  }

  add (payload) {
    payload = this.appendTimeStamps(payload)
    return this.table.add(payload)
  }

  getAll () {
    return this.table.toArray()
  }

  update (id, data) {
    data = this.appendTimeStamps(data, 'update')
    return this.table.update(id, data)
  }

  remove (id) {
    return this.table.delete(id)
  }

  appendTimeStamps (payload, action = 'create') {
    var now = moment().format('YYYY-MM-DD HH:mm:ss')
    if (action === 'create') Object.assign(payload, { created_at: now, updated_at: now })
    else Object.assign(payload, { updated_at: now })
    return payload
  }
}

export const Person = new PersonModel()
