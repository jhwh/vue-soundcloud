<template>
  <nav class="navbar navbar-expand-lg navbar-dark indigo fixed-top">
      <a class="navbar-brand" href="/">Vue Soundcloud</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
          <search-bar></search-bar>
      </div>
  </nav>
</template>
<script>
import SearchBar from '~/components/TheSearchBar'
export default {
  components: {
    'search-bar': SearchBar
  }
}
</script>
