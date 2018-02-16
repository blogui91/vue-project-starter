import OAuth from 'oauth'
import AxiosInterceptor from 'src/interceptors/axios' // eslint-disable-line no-unused-vars
import RouterInterceptor from 'src/interceptors/v-router'// eslint-disable-line no-unused-vars
import { store } from 'src/stores' // store/index.js
import { EventDispatcher } from 'src/event'
import Database from 'src/database' // eslint-disable-line

import ServiceProviders from 'providers'
export default {
  install (Vue, options) {
    // In this way we'll expose our class in all Vue components
    Vue.prototype.$oauth = new OAuth()
    Vue.prototype.$event = EventDispatcher
    ServiceProviders.run()
    Vue.mixin({
      store,
      mounted () {}
    })
  }
}
