<template>
  <div>

    <v-file-input accept="video/*" @change="handleFile"></v-file-input>

    <div v-if="tricks">
      <p v-for="t in tricks">
        {{ t.name }}
      </p>
    </div>

    <div>
      <v-text-field label="Tricking Name" v-model="trickName"></v-text-field>
      <v-btn @click="saveTricks">Save Trick</v-btn>
    </div>

    {{ message }}
    <v-btn @click="reset">Reset Message</v-btn>
    <v-btn @click="resetTricks">Reset Tricks</v-btn>

  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import axios from "axios";

export default {
  data: () => ({
    trickName: ""
  }),
  computed: {
    ...mapState({
      message: state => state.message
    }),
    ...mapState('tricks', {
      tricks: state => state.tricks
    })
  },
  methods: {
    ...mapMutations([
      'reset'
    ]),
    ...mapMutations('tricks', {
      resetTricks: 'reset'
    }),
    ...mapActions('tricks', ['createTricks']),
    async saveTricks() {
      await this.createTricks(
        {trick: {name: this.trickName}}
      );
      this.trickName = "";
    },
    async handleFile(file) {
      if(!file) return;

      const form = new FormData();
      form.append("video", file, file.name);

      console.log('file  ', file);
      console.log('form  ', form);
      console.log('...form  ', ...form);

      for (let key of form.entries()) {
        console.log(key[0] + ', ' + key[1])
      }

      const result = await axios.post("http://localhost:5000/api/videos", form)
      console.log('result: ', result);
    }
  }
  // async fetch() {
  //   await this.$store.dispatch('fetchMessage');
  // }
  // asyncData(payload) {
  //   return axios.get("http://localhost:5000/api/home")
  //     .then(({data}) => {
  //       return { message : data };
  //     })
  // }
}
</script>
