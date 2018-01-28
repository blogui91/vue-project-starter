import { EventDispatcher } from 'src/event'
export class EventHandler {
  constructor () {
    this.evt = EventDispatcher.evt
    this.fire = EventDispatcher.fire
    this.listen = EventDispatcher.listen
  }

  fetched (user) { }

  beforeCreate (user) { }
  created (user) { }

  beforeUpdate (user) { }
  updated (user) { }

  beforeDelete (user) { }
  deleted (user) { }
}
