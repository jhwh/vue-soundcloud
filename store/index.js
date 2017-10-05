import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import state from './state'
const createStore = () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
}

export default createStore
