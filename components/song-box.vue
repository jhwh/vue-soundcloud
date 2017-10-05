<template>
  <div class="col-sm-4">
    <div class="card">
        <!--Card image-->
        <div class="img-fluid card-image" v-bind:style="{ 'background-image': 'url(' + photo + ')' }">
          <div v-if="isSongActive()" :style="{ 'width': this.setSongProgress() + '%' }" class="progress-wave"></div>
          <img class="img-responsive" :src="waveimg" />
        </div>
        <!--Card content-->
        <div class="card-body">
            <!--Title-->
            <h4 class="card-title">{{ title }}</h4>
            <!--Text-->
            <p class="card-text">{{ description }}</p>
            <a href="#" v-on:click.prevent="toggle" class="btn btn-primary">
              <i class="fa fa-play" aria-hidden="true"></i>
            </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'photo', 'waveimg', 'id'],
  methods: {
    toggle () {
      const song = this.$store.getters.getSongById(this.id)
      this.$store.commit('setCurrentSong', { song, active: true })
    },
    setSongProgress () {
      return this.id === this.$store.getters.getCurrentSong.id ? this.$store.getters.getSongProgress : 0
    },
    isSongActive () {
      return this.id === this.$store.getters.getCurrentSong.id
    }
  },
  computed: {
  }
}
</script>
