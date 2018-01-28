import Vue from 'vue'

export class Dispatcher {
  constructor () {
    this.evt = new Vue()
  }

  listen (evt, callback) {
    this.evt.$on(evt, callback)
  }

  fire (evt, data = null) {
    this.evt.$emit(evt, data)
  }
}

export const EventDispatcher = new Dispatcher()
