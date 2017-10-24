import { searchMusic, getTrackById } from '../middleware/api'
import _ from 'lodash'
import axios from 'axios'
import { changeImageSizes } from '../middleware/helpers'
export default {
  searchByQuery ({ commit }, payload = '20SYL') {
    searchMusic({ query: payload, genres: this.state.current_category }).then((res) => commit('searchByQuery', {data: res.data, query: payload, collection: changeImageSizes(res.data.collection)}))
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
  },
  getTrackById ({commit}, id) {
    if (id) {
      getTrackById(id).then((res) => {
        if (!_.isEmpty(res)) {
          return commit('loadTrackById', {song: changeImageSizes([res.data]), query: res.data.title})
        } else {
          return commit('songNotFound')
        }
      })
    }
  }
}
