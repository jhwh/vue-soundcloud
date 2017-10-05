export default {
  init (state, data) {
    state.music_list = data.collection
    state.next_href = data.next_href
    state.loading = false
  },
  loadMoreSongs (state, { data }) {
    state.music_list = [...state.music_list, ...data.collection]
    state.next_href = data.next_href
    state.loading = false
  },
  setCurrentSong (state, { song, active }) {
    state.current_song.song = song
    state.current_song.active = active
  },
  setSongProgress (state, data) {
    state.current_song.progress = data
  },
  loading: (state, data) => { state.loading = data }
}
