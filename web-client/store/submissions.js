﻿const initState = () => ({
  submissions: []
})

export const state = initState;


// mutations is sync method
// actions is async methods

export const mutations = {
  setSubmissions(state, {submissions}) {
    state.submissions = submissions;
  },

  reset(state) {
    Object.assign(state, initState());
  }
}

export const actions = {
  async fetchSubmissions({commit}) {
    const submissions = await this.$axios.$get("http://localhost:5000/api/submissions");
    commit("setSubmissions", {submissions});
  }
}
