<template>
  <audio :src="this.getCurrentSongStream()" v-on:timeupdate="onTimeUpdateListener" onEnded="" autoPlay></audio>
</template>
<script>
import { returnMusicStream } from '../middleware/api'
export default {
  methods: {
    getCurrentSongStream () {
      const song = this.$store.getters.getCurrentSong
      if (song.id !== undefined) {
        return returnMusicStream(song.id)
      }
    },
    onTimeUpdateListener () {
      let proc = (100 * this.$el.currentTime) / this.$el.duration
      this.$store.commit('setSongProgress', proc)
    }
  }
}
</script>
