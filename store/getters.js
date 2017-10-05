export default {
  playlist: (state) => state.music_list,
  nextHref: (state) => state.next_href,
  loading: (state) => state.loading,
  getSongById: (state) => (id) => {
    return state.music_list.find(song => song.id === id)
  },
  getCurrentSong: (state) => state.current_song.song,
  getSongProgress: (state) => (!isNaN(state.current_song.progress) ? state.current_song.progress : 0)
}
