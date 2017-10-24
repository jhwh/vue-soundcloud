<template>
  <div class="row">
    <button v-if="!this.$store.getters.isSingleSong"
            v-on:click="loadMoreSongs"
            type="button"
            class="btn purple-gradient btn-lg btn-more">{{ loading ? "Loading ..." : "Load More" }}
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    loadMoreSongs () {
      this.$store.dispatch('loadMoreSongs')
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
