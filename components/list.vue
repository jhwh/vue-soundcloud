<template>
  <div class="row margin-top-90">
      <SongBox
        v-for="song in getPlaylist"
        :title="song.title"
        :description="song.description"
        :photo="song.artwork_url"
        :waveimg="song.waveform_url"
        :id="song.id"
        :key="song.id"
        />
  </div>
</template>

<script>
import SongBox from '~/components/song-box.vue'
import _ from 'lodash'
export default {
  components: {
    SongBox
  },
  methods: {
    trunc (str, n) {
      return (_.isString(str) && str.length > n) ? str.substr(0, n - 1) + '...' : str
    },
    changeImageSize (str, size) {
      return !_.isNull(str) ? str.replace('large', `t${size}x${size}`) : ''
    }
  },
  computed: {
    getPlaylist () {
      let playlist = Array.from(this.$store.getters.playlist)
      playlist.map((track, index) => {
        if (_.isNull(track.artwork_url)) {
          track.artwork_url = `https://source.unsplash.com/${500 + index}x${500 + index}/?music`
        } else {
          track.artwork_url = this.changeImageSize(track.artwork_url, 500)
        }
        track.description = this.trunc(track.description, 100)
        track.title = this.trunc(track.title, 50)
      })
      return playlist
    }
  }
}
</script>
