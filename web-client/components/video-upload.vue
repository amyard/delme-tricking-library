<template>
  <v-dialog :value="active" persistent>
    <template v-slot:activator>
      <v-btn depressed @click="toggleActivity">
        Upload
      </v-btn>
    </template>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Select Type</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Upload Video</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 3" step="3">Trick information</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">Review</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="d-flex flex-column align-center">
            <v-btn class="my-2" @click="setType(uploadType.TRICK)">Trick
            </v-btn>
            <v-btn class="my-2" @click="setType(uploadType.SUBMISSION)">Submission</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <v-file-input accept="video/*" @change="handleFile"></v-file-input>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div>
            <v-text-field label="Tricking Name" v-model="trickName"></v-text-field>
            <v-btn @click="saveTricks">Save Trick</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div>
            Success
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <div class="d-flex justify-center my-4">
      <v-btn @click="toggleActivity">Close</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import {UPLOAD_TYPE} from '../data/enum';

export default {
  name: "video-upload",

  data: () => ({
    trickName: ""
  }),

  computed: {
    ...mapState('video-upload', ['uploadPromise', 'active', 'step']),
    uploadType() {
      return {...UPLOAD_TYPE}
    }
  },

  methods: {
    ...mapMutations('video-upload', ['reset', 'toggleActivity', 'setType']),
    ...mapActions('video-upload', ['createTricks', 'startVideoUpload']),

    async handleFile(file) {
      if (!file) return;

      const form = new FormData();
      form.append("video", file, file.name);
      this.startVideoUpload({form});
    },

    async saveTricks() {
      if (!this.uploadPromise) {
        console.log('the upload task is null');
        return;
      }

      const video = await this.uploadPromise;
      await this.createTricks({trick: {name: this.trickName, video}});
      this.trickName = "";
      this.reset();
    }
  }
}
</script>

<style scoped>

</style>
