<template>
  <div id="playlist" class="row">
      <SongBox
        v-for="song in getPlaylist"
        :title="song.title"
        :description="song.description"
        :photo="song.artwork_url"
        :waveimg="song.waveform_url"
        :id="song.id"
        :user="song.user"
        :duration="song.duration"
        :likes="song.likes_count"
        :key="song.id"
        />
  </div>
</template>

<script>
import SongBox from '~/components/VSongBox.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    SongBox
  },
  computed: {
    ...mapGetters([
      'getPlaylist'
    ])
  }
}
</script>
