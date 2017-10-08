<template>
  <form class="form-inline">
      <input v-model="query" v-on:input.prevent="searchMusic" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
  </form>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      deley: null
    }
  },
  methods: {
    searchMusic () {
      if (this.deley !== null) {
        clearTimeout(this.deley)
      }
      this.deley = setTimeout(() => this.$store.dispatch('searchByQuery', this.query), 1000)
    }
  }
}
</script>
