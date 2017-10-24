<template>
  <div class="col-md-3">
    <div class="card">
        <div
          class="img-fluid card-image"
          v-bind:style="{ 'background-image': 'url(' + photo + ')' }">
          <div
            v-if="isSongActive()"
            :style="{ 'width': this.setSongProgress() + '%' }"
            class="progress-wave"></div>
          <img
            class="img-responsive"
            :src="waveimg" />
        </div>
        <div class="card-body">
            <h4 class="card-title">
              {{ user.permalink }}
              <a title="share" :href="'/?song=' + id" target="_blank">
                <i class="fa fa-share pull-right" aria-hidden="true"></i>
              </a>
              <a :href="user.permalink_url" target="_blank">
                <i class="fa fa-external-link pull-right" aria-hidden="true"></i>
              </a>
              <div class="likes-count pull-right">
                <i class="fa fa-heart" aria-hidden="true"></i>
                {{ likes }}
              </div>
            </h4>
            <p class="card-text">{{ title }}</p>
            <div class="row">
              <div class="col-xs-6">
                <a href="#" v-on:click.prevent="toggle" class="btn btn-primary">
                  <i v-if="songStatus" class="fa fa-play" aria-hidden="true"></i>
                  <i v-else class="fa fa-pause" aria-hidden="true"></i>
                </a>
              </div>
              <div class="col-xs-6">
                <p class="duration text-right">
                  {{ displayInMinutes() }}
                </p>
              </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    photo: String,
    waveimg: String,
    id: Number,
    user: Object,
    duration: Number,
    likes: Number
  },
  methods: {
    toggle () {
      const song = this.$store.getters.getSongById(this.id)
      this.togglePlayer()
      this.$store.commit('setCurrentSong', { song, status: this.getSongStatus() })
    },
    setSongProgress () {
      return this.id === this.$store.getters.getCurrentSong.id ? this.$store.getters.getSongProgress : 0
    },
    isSongActive () {
      return this.id === this.$store.getters.getCurrentSong.id
    },
    togglePlayer () {
      const audio = document.querySelector('audio')
      if (this.$store.getters.getCurrentSong.id !== undefined) {
        audio.paused ? audio.play() : audio.pause()
      }
    },
    displayInMinutes () {
      let time = this.duration / 1000
      time = parseInt(time).toFixed(0)
      return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60
    },
    getSongStatus () {
      return !(this.$store.getters.getCurrentSongStatus && this.isSongActive())
    }
  },
  computed: {
    songStatus () {
      return this.getSongStatus()
    }
  }
}
</script>
