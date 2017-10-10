<template>
  <form v-on:submit.prevent class="form-inline">
      <input v-model="query" v-on:input.prevent="searchMusic" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
      <div v-if="loader" class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
  </form>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      query: '',
      loader: false
    }
  },
  watch: {
    query (newQuery) {
      this.loader = true
    }
  },
  methods: {
    searchMusic: _.debounce(function () {
      this.loader = false
      this.$store.dispatch('searchByQuery', this.query)
    }, 500)
  }
}
</script>
