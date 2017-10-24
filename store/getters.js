export default {
  getPlaylist: (state) => state.music_list,
  nextHref: (state) => state.next_href,
  loading: (state) => state.loading,
  getSongById: (state) => (id) => state.music_list.find(song => song.id === id),
  getCurrentSong: (state) => state.current_song.song,
  getCurrentSongStatus: (state) => state.current_song.status,
  getSongProgress: (state) => (!isNaN(state.current_song.progress) ? state.current_song.progress : 0),
  getSongCurrentTime: (state) => (!isNaN(state.current_song.current_time) !== null ? state.current_song.current_time : 0),
  qetQuery: (state) => state.query,
  getCurrentSongIndex: (state) => state.music_list.findIndex((song) => song.id === state.current_song.song.id),
  getRepeatSong: (state) => state.repeat_song,
  getRepeatPlaylist: (state) => state.repeat_playlist,
  getPlayerType: (state) => state.player_type,
  getVolume: (state) => state.volume,
  isSingleSong: (state) => state.single_song,
  isRandom: (state) => state.random,
  getNextSongIdByIndex: (state) => (i) => {
    if (state.music_list.length > 0) {
      i = i + 1
      i = i % state.music_list.length
      return state.music_list[i].id
    } else {
      return false
    }
  },
  getPrevSongIdByIndex: (state) => (i) => {
    if (state.music_list.length > 0) {
      if (i === 0) {
        i = state.music_list.length
      }
      i = i - 1
      return state.music_list[i].id
    } else {
      return false
    }
  }
}
