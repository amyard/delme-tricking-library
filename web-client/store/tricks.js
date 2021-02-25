const initState = () => ({
  tricks: [],
  categories: [],
  difficulties: [],
})

export const state = initState;

export const getters = {
  trickById: state => id => state.tricks.find(x => x.id === id),
  categoryById: state => id => state.categories.find(x => x.id === id),
  trickItems: state => state.tricks.map(x => ({
    text: x.name,
    value: x.id
  })),
  categoryItems: state => state.categories.map(x => ({
    text: x.name,
    value: x.id
  })),
  difficultyItems: state => state.difficulties.map(x => ({
    text: x.name,
    value: x.id
  })),
}

// mutations is sync method
// actions is async methods

export const mutations = {
  setTricks(state, {tricks, difficulties, categories}) {
    state.tricks = tricks;
    state.difficulties = difficulties;
    state.categories = categories;
  },

  reset(state) {
    Object.assign(state, initState());
  }
}

export const actions = {
  async fetchTricks({commit}) {
    const tricks = await this.$axios.$get("/api/tricks");
    const difficulties = await this.$axios.$get("/api/difficulties");
    const categories = await this.$axios.$get("/api/categories");

    console.log("tricks: ", tricks);

    commit("setTricks", {tricks, difficulties, categories});
  },
  createTricks({state, commit, dispatch}, {form}) {
    return this.$axios.$post("/api/tricks", form);
  }
}
