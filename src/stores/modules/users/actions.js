import User from 'services/User.service'

const actions = {
  async getCurrentUser ({
    commit,
    state
  }, payload) {
    if (state.currentUser) return state.currentUser
    let user_promise = User.currentUser() // eslint-disable-line
    user_promise
      .then(user => {
        commit('users/setCurrentUser', user, {
          root: true
        })
      })
      .catch(error => {
        console.log('There was an error :c')
        throw error
      })
  },
  destroyCurrentUser ({ commit, state }, payload) {
    commit('users/setCurrentUser', {
      data: null
    }, {
      root: true
    })
  }
}

export default actions
