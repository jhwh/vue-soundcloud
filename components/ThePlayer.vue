<template>
  <div>
    <audio :src="getCurrentSongStream()" v-on:timeupdate="onTimeUpdateListener" v-on:ended="playNext" autoPlay></audio>
    <div v-if="getCurrentSong()" class="player">
      	<div class="progress-search">
      		<div class="bar"
               :style="{ 'width': this.$store.getters.getSongProgress + '%' }"></div>
      	</div>
      	<div class="current-track">
      		<figure class="albumn-cover"><img :src="getCurrentSong().artwork_url" :alt="getCurrentSong().tag_list" /></figure>
          <div class="track-name">
            <h1><a target="_blank" :href="getCurrentSong().permalink_url">{{ getCurrentSong().title }}</a></h1>
            <h2>
              <span class="artist"><a target="_blank" :href="getCurrentSong().user.permalink_url">{{ getCurrentSong().user.permalink }}</a></span>
            </h2>
          </div>
      	</div>
      	<div class="controls">
      		<ul>
      			<li class="active toggle"><i class="fa fa-repeat"></i></li>
      			<li v-on:click.prevent="playPrev"><i class="fa fa-fast-backward"></i></li>
      			<li v-on:click.prevent="togglePlayer">
              <i v-if="!this.$store.getters.getCurrentSongStatus" class="fa fa-play" aria-hidden="true"></i>
              <i v-else class="fa fa-pause" aria-hidden="true"></i>
            </li>
      			<li v-on:click.prevent="playNext"><i class="fa fa-fast-forward"></i></li>
      			<li class="toggle"><i class="fa fa-random"></i></li>
            <li><i class="fa fa-ellipsis-v"></i></li>
      		</ul>
      	</div>
      </div>
  </div>
  </div>

</template>
<script>
import { returnMusicStream } from '../middleware/api'
import _ from 'lodash'
export default {
  methods: {
    getCurrentSongStream (song = this.$store.getters.getCurrentSong) {
      return (song.id !== undefined) ? returnMusicStream(song.id) : ''
    },
    onTimeUpdateListener () {
      const audio = document.querySelector('audio')
      let proc = (100 * audio.currentTime) / audio.duration
      this.$store.commit('setSongProgress', proc)
    },
    playNext () {
      const nextSongId = this.$store.getters.getNextSongIdByIndex(this.$store.getters.getCurrentSongIndex)
      if (nextSongId) {
        const song = this.$store.getters.getSongById(nextSongId)
        this.$store.commit('setCurrentSong', {song})
      }
    },
    playPrev () {
      const prevSongId = this.$store.getters.getPrevSongIdByIndex(this.$store.getters.getCurrentSongIndex)
      if (prevSongId) {
        const song = this.$store.getters.getSongById(prevSongId)
        this.$store.commit('setCurrentSong', {song})
      }
    },
    getCurrentSong () {
      const song = this.$store.getters.getCurrentSong
      return _.isEmpty(song) ? false : song
    },
    togglePlayer () {
      const song = this.$store.getters.getCurrentSong
      const audio = document.querySelector('audio')
      if (song.id !== undefined) {
        audio.paused ? audio.play() : audio.pause()
        this.$store.commit('setCurrentSong', { song, status: !audio.paused })
      }
    }
  }
}
</script>
