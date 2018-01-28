import actions from './actions'
import state from './state'
import getters from './getters'
import mutations from './mutations'
const userModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
export default userModule
