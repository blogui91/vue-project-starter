import { EventHandler } from './EventHandler'
class VisitEventHandler extends EventHandler {
  constructor () {
    super()
    this.listen('Visit:fetched', this.fetched)
    this.listen('Visit:before-create', this.beforeCreate)
    this.listen('Visit:created', this.created)
    this.listen('Visit:before-update', this.beforeUpdate)
    this.listen('Visit:updated', this.updated)
    this.listen('Visit:before-destroy', this.beforeDestroy)
    this.listen('Visit:destroyed', this.destroyed)
  }

  fetched (visit) {
    console.log(visit, ' Fetched')
  }
}

export default VisitEventHandler
