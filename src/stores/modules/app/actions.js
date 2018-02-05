const actions = {
  setStatus ({
    commit,
    state
  }, payload) {
    commit('app/setStatus', payload, {
      root: true
    })
  }
}

export default actions
