import axios from "axios";

const initState = () => ({
  message: "init"
})

export const state = initState;


// mutations is sync method
// actions is async methods

export const mutations = {
  setMessage(state, message) {
    state.message = message;
  },

  reset(state) {
    Object.assign(state, initState());
  }
}

// nuxtServerInit - is working only once in SSR
export const actions = {
  async nuxtServerInit({commit, dispatch}) {
    const message = (await axios.get("http://localhost:5000/api/home")).data;
    console.log('message:  ', message);
    commit("setMessage", message);
    await dispatch('tricks/fetchTricks');
  }
}
