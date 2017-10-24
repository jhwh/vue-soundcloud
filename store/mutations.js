export default {
  searchByQuery (state, {data, query, collection}) {
    state.query = query
    state.music_list = collection
    state.next_href = data.next_href
    state.single_song = false
    state.loading = false
  },
  loadTrackById (state, {query, song}) {
    state.query = query
    state.music_list = song
    state.single_song = true
    state.loading = false
  },
  songNotFound (state) {
    state.music_list = []
    state.single_song = true
    state.query = 'Song not found'
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
  togglePlayerType: (state, data) => { state.player_type = data },
  toggleRandom: (state, data) => { state.random = data },
  setVolume: (state, data) => { state.volume = data },
  changeImagesInPlaylist: (state, data) => { state.music_list = data }
}
