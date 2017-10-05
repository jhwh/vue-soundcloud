import { searchMusic } from '../middleware/api'
import axios from 'axios'
export default {
  init ({ commit }) {
    searchMusic(this.state.current_category).then((res) => commit('init', res.data))
  },
  loadMoreSongs ({commit}) {
    commit('loading', true)
    let songs = axios.get(this.state.next_href)
      .then(res => res)
      .then(json => new Promise((resolve, reject) => {
        resolve(json)
      })).catch((err) => {
        console.log(err)
        return {}
      })
    songs.then((res) => commit('loadMoreSongs', res))
  }
}
