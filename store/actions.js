import { searchMusic } from '../middleware/api'
import axios from 'axios'
export default {
  searchByQuery ({ commit }, payload = 'patr00') {
    searchMusic({ query: payload, genres: this.state.current_category }).then((res) => commit('searchByQuery', {data: res.data, query: payload}))
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
