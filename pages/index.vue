<template>
  <section class="container-fluid">
      <h1 class="margin-top-90 query-title">Search Results:
        <span>{{ query }}</span>
      </h1>
      <MainHeader />
      <Playlist />
      <MoreButton />
      <Player />
  </section>
</template>

<script>
import Playlist from '~/components/ThePlaylist.vue'
import MainHeader from '~/components/TheHeader.vue'
import MoreButton from '~/components/TheMoreButton.vue'
import Player from '~/components/ThePlayer.vue'
export default {
  components: {
    MainHeader,
    Playlist,
    MoreButton,
    Player
  },
  computed: {
    query () {
      return this.$store.getters.qetQuery
    }
  },
  created () {
    this.$store.dispatch('searchByQuery')
  }
}
</script>
