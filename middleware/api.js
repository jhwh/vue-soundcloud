import _ from 'lodash'
import axios from 'axios'
const CLIENT_ID = 'f4323c6f7c0cd73d2d786a2b1cdae80c'
// const CLIENT_ID = 'f17c1d67b83c86194fad2b1948061c9e'

export const searchMusic = (query, limit = 20, page = 0, genres = '') => {
  return axios.get(
    `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&q=${query}&limit=${limit}&offset=${page * limit}&genres=${genres}`
  ).then(res => res)
    .then(json => new Promise((resolve, reject) => {
      if (_.isEmpty(query)) {
        // reject('Query is empty')
      } else {
        resolve(json)
      }
    })).catch((err) => {
      console.log(err)
      return {}
    })
}

export const renderListByType = (genres = '', limit = 20, page = 0) => {
  return fetch(
    `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&limit=${limit}&offset=${page * limit}&genres=${genres}`
  ).then(res => res.json())
    .then(json => new Promise((resolve, reject) => {
      resolve(json)
    })).catch((err) => {
      console.log(err)
      return {}
    })
}

export const returnMusicStream = (trackId) => {
  return _.isEmpty(trackId) ? `https://api.soundcloud.com/tracks/${trackId}/stream?client_id=${CLIENT_ID}` : ''
}
