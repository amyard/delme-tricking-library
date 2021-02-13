<template>
  <div>

    <div class="text-center">
      <logo/>
      <vuetify-logo/>
    </div>

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
