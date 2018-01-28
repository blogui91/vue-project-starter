import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import visits from './modules/visits'
Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    users,
    visits
  }
})
