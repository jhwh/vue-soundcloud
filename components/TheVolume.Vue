<template>
  <input v-if="this.$store.getters.getPlayerType"
         type="range"
         min="0"
         :max="100"
         v-model="volume"
         v-on:input="setVolume"
         >
</template>
<script>

export default {
  data () {
    return {
      volume: this.$store.getters.getVolume
    }
  },
  methods: {
    setVolume () {
      const audio = document.querySelector('audio')
      const volume = this.$el.value / 100
      audio.volume = volume
      this.$store.commit('setVolume', volume * 100)
    }
  }
}
</script>

<style scoped>
  input[type=range]{
    width: 100%;
    margin-left: 0;
  }
</style>
