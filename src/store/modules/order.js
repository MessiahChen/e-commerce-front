const getDefaultState = () => {
  return {
    payList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_PAYLIST:(state,payList)=> {
    state.payList = payList
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

