import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import visits from './modules/visits'
import app from './modules/app'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    app,
    users,
    visits
  }
})
