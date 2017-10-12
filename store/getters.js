export default {
  playlist: (state) => state.music_list,
  nextHref: (state) => state.next_href,
  loading: (state) => state.loading,
  getSongById: (state) => (id) => state.music_list.find(song => song.id === id),
  getCurrentSong: (state) => state.current_song.song,
  getCurrentSongStatus: (state) => state.current_song.status,
  getSongProgress: (state) => (!isNaN(state.current_song.progress) ? state.current_song.progress : 0),
  getSongCurrentTime: (state) => (!isNaN(state.current_song.current_time) !== null ? state.current_song.current_time : 0),
  qetQuery: (state) => state.query,
  getCurrentSongIndex: (state) => state.music_list.findIndex((song) => song.id === state.current_song.song.id),
  getNextSongIdByIndex: (state) => (index) => state.music_list[index + 1].id !== '-1' ? state.music_list[index + 1].id : false,
  getPrevSongIdByIndex: (state) => (index) => state.music_list[index - 1].id !== '-1' ? state.music_list[index - 1].id : false,
  getRepeatSong: (state) => state.repeat_song,
  getRepeatPlaylist: (state) => state.repeat_playlist,
  getPlayerType: (state) => state.player_type
}
