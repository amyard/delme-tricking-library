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
  async nuxtServerInit({commit, dispatch}) {
    await dispatch('tricks/fetchTricks');
    await dispatch('submissions/fetchSubmissions');
  }
}
