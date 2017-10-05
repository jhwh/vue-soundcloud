<template>

  <section class="container-fluid">
      <Navbar />
      <List />
      <LoadMoreButton />
      <Player />
  </section>
</template>

<script>
import List from '~/components/list.vue'
import Navbar from '~/components/navbar.vue'
import LoadMoreButton from '~/components/load-more-button.vue'
import Player from '~/components/player.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Navbar,
    List,
    LoadMoreButton,
    Player
  },
  computed: {
    ...mapState({
      externals: state => state.externals
    })
  },
  created () {
    this.$store.dispatch('init')
  }
}
</script>
