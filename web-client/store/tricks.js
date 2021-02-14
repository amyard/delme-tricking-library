const initState = () => ({
  tricks: []
})

export const state = initState;


// mutations is sync method
// actions is async methods

export const mutations = {
  setTricks(state, {tricks}) {
    state.tricks = tricks;
  },

  reset(state) {
    Object.assign(state, initState());
  }
}

export const actions = {
  async fetchTricks({commit}) {
    //const tricks = (await axios.get("http://localhost:5000/api/tricks")).data;
    const tricks = await this.$axios.$get("http://localhost:5000/api/tricks");
    commit("setTricks", {tricks});
  }
}
