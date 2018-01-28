import { EventHandler } from './EventHandler'
class UserEventHandler extends EventHandler {
  constructor () {
    super()
    this.listen('user:fetched', this.fetched)
    this.listen('user:before-create', this.beforeCreate)
    this.listen('user:created', this.created)
    this.listen('user:before-update', this.beforeUpdate)
    this.listen('user:updated', this.updated)
    this.listen('user:before-destroy', this.beforeDestroy)
    this.listen('user:destroyed', this.destroyed)
  }
}

export default UserEventHandler
