const initState = () => ({})

export const state = initState;


// mutations is sync method
// actions is async methods

export const mutations = {
  reset(state) {
    Object.assign(state, initState());
  }
}

// nuxtServerInit - is working only once in SSR
export const actions = {
  nuxtServerInit({dispatch}) {
    return dispatch("tricks/fetchTricks")
  }
}
