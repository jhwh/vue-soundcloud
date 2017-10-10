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
  setSongProgress (state, data) {
    state.current_song.progress = data
  },
  setQuery (state, data) {
    state.query = data
  },
  loading: (state, data) => { state.loading = data }
}
