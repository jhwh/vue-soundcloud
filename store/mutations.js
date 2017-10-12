export default {
  searchByQuery (state, {data, query}) {
    state.query = query
    state.music_list = data.collection
    state.next_href = data.next_href
    state.loading = false
  },
  loadMoreSongs (state, { data }) {
    state.music_list = [...state.music_list, ...data.collection]
    state.next_href = data.next_href
    state.loading = false
  },
  setCurrentSong (state, { song, status = true }) {
    state.current_song.song = song
    state.current_song.status = status
  },
  setSongProgress (state, { proc, currentTime }) {
    state.current_song.progress = proc
    state.current_song.current_time = currentTime
  },
  setQuery (state, data) {
    state.query = data
  },
  setRepeatSong: (state, data) => { state.repeat_song = data },
  setRepeatPlaylist: (state, data) => { state.repeat_playlist = data },
  loading: (state, data) => { state.loading = data },
  togglePlayerType: (state, data) => { state.player_type = data }
}
