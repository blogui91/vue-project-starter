import actions from './actions'
import state from './state'
import getters from './getters'
import mutations from './mutations'
const newModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
export default newModule
