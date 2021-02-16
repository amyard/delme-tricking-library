import {UPLOAD_TYPE} from "../data/enum";

const initState = () => ({
  uploadPromise: null,
  active: false,
  component: null
})

export const state = initState;

export const mutations = {
  activate(state, {component}) {
    state.active = true;
    state.component = component;
  },
  setTask(state, {uploadPromise}) {
    state.uploadPromise = uploadPromise
  },
  hide(state){
    state.active = false;
  },
  reset(state) {
    Object.assign(state, initState());
  }
}

export const actions = {
  startVideoUpload({commit, dispatch}, {form}) {
    const uploadPromise = this.$axios.$post("/api/videos", form);
    console.log('form in startVideoUpload: ', form)
    console.log('uploadPromise in startVideoUpload: ', uploadPromise)
    commit("setTask", {uploadPromise});
  },
  async createSubmission({state, commit, dispatch}, {form}) {
    if (!state.uploadPromise) {
      console.log('the upload task is null');
      return;
    }

    form.video = await state.uploadPromise;
    await dispatch('submissions/createSubmission', {form}, {root: true});
    commit('reset');
  }
}
