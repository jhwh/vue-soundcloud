<template>
  <div>
    <audio
      :src="getCurrentSongStream()"
      v-on:timeupdate="onTimeUpdateListener"
      v-on:ended="autoPlay"
      autoPlay
      ></audio>
    <div v-if="getCurrentSong()"
         class="player"
         v-bind:class="{ bigPlayer: this.$store.getters.getPlayerType }">
      	<div class="progress-search">
      		<div class="bar"
               :style="{ 'width': this.$store.getters.getSongProgress + '%' }">
          </div>
      	</div>
      	<div class="current-track">
      		<figure class="albumn-cover">
            <img :src="getCurrentSong().artwork_url" :alt="getCurrentSong().tag_list" />
          </figure>
          <div class="track-name">
            <h1>
              <a target="_blank" :href="getCurrentSong().permalink_url">{{ getCurrentSong().title }}</a>
            </h1>
            <h2>
              <span class="artist">
                <a target="_blank" :href="getCurrentSong().user.permalink_url">{{ getCurrentSong().user.permalink }}</a>
              </span>
            </h2>
            <input v-if="this.$store.getters.getPlayerType"
                   type="range"
                   min="0"
                   :max="this.$store.getters.getCurrentSong.duration"
                   v-model="currentTime"
                   v-on:change="setPlayerTime"
                   v-on:mouseup="toggleDrag"
                   v-on:mousedown="toggleDrag">
          </div>
      	</div>
      	<div class="controls">

      		<ul>
      			<li class="toggle"
                v-bind:class="{ active: this.$store.getters.getRepeatPlaylist }"
                v-on:click="toggleRepeat">
              <i class="fa fa-repeat">
                <span v-if="this.$store.getters.getRepeatSong">1</span>
              </i>
            </li>
      			<li v-on:click.prevent="playPrev"><i class="fa fa-fast-backward"></i></li>
      			<li v-on:click.prevent="togglePlayer">
              <i v-if="!this.$store.getters.getCurrentSongStatus" class="fa fa-play" aria-hidden="true"></i>
              <i v-else class="fa fa-pause" aria-hidden="true"></i>
            </li>
      			<li v-on:click.prevent="playNext"><i class="fa fa-fast-forward"></i></li>

      			<li class="toggle"
                v-on:click.prevent="toggleRandom"
                v-bind:class="{ active: this.$store.getters.isRandom }">
                <i class="fa fa-random"></i>
            </li>

            <li v-on:click.prevent="togglePlayerType"
                v-bind:class="{ active: this.$store.getters.getPlayerType }">
              <i class="fa fa-ellipsis-v"></i>
            </li>
            <li class="toggle"
                v-if="this.$store.getters.getPlayerType"><i class="fa fa-volume-up"></i>
                <Volume />
            </li>
      		</ul>
      	</div>
      </div>
  </div>
</template>
<script>
import { returnMusicStream } from '../middleware/api'
import Volume from '~/components/TheVolume'
import _ from 'lodash'
export default {
  components: {
    Volume
  },
  data () {
    return {
      repeter: +this.$store.getters.getRepeatPlaylist,
      value: this.$store.getters.getSongProgress,
      drag: false,
      currentTime: 0
    }
  },
  methods: {
    getCurrentSongStream (song = this.$store.getters.getCurrentSong) {
      return (song.id !== undefined) ? returnMusicStream(song.id) : ''
    },
    onTimeUpdateListener () {
      const audio = document.querySelector('audio')
      let proc = (100 * audio.currentTime) / audio.duration
      this.$store.commit('setSongProgress', { proc, currentTime: audio.currentTime * 1000 })
      if (!this.drag) {
        this.currentTime = audio.currentTime * 1000
      }
    },
    autoPlay () {
      const audio = document.querySelector('audio')
      const song = this.$store.getters.getCurrentSong
      if (!this.$store.getters.getRepeatSong && this.$store.getters.getRepeatPlaylist) {
        audio.loop = false
        this.$store.getters.isRandom ? this.playRandom() : this.playNext()
      } else {
        this.$store.commit('setSongProgress', 0)
        this.$store.commit('setCurrentSong', { song, status: false })
      }
    },
    playRandom () {
      const id = _.sampleSize(this.$store.getters.getPlaylist, 1)[0].id
      const song = this.$store.getters.getSongById(id)
      this.$store.commit('setCurrentSong', {song})
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
    },
    toggleRepeat () {
      const audio = document.querySelector('audio')
      audio.loop = false
      if (this.repeter === 0) {
        this.$store.commit('setRepeatPlaylist', true)
        this.repeter = 1
      } else if (this.repeter === 1) {
        this.$store.commit('setRepeatSong', true)
        this.repeter = 2
        audio.loop = true
      } else {
        this.$store.commit('setRepeatPlaylist', false)
        this.$store.commit('setRepeatSong', false)
        this.repeter = 0
      }
    },
    togglePlayerType () {
      this.$store.commit('togglePlayerType', !this.$store.getters.getPlayerType)
    },
    getSongCurrentTime () {
      return !this.drag ? this.$store.getters.getSongCurrentTime : false
    },
    setPlayerTime (el) {
      const audio = document.querySelector('audio')
      let proc = (el.target.value / 1000) / audio.duration
      this.$store.commit('setSongProgress', { proc, currentTime: el.target.value })
      audio.currentTime = el.target.value / 1000
    },
    toggleDrag () {
      this.drag = !this.drag
    },
    toggleRandom () {
      this.$store.commit('toggleRandom', !this.$store.getters.isRandom)
    }
  }
}
</script>
