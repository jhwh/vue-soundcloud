import _ from 'lodash'
import axios from 'axios'
// const CLIENT_ID = 'f4323c6f7c0cd73d2d786a2b1cdae80c'
// const CLIENT_ID = 'f17c1d67b83c86194fad2b1948061c9e'
const CLIENT_ID = 'a0f84e7c2d612d845125fb5eebff5b37'
const USER = 82567563

export const searchMusic = ({query, limit = 20, page = 0, genres = ''}) => {
  return axios.get(
    `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&q=${query}&limit=${limit}&offset=${page * limit}&genres=${genres}`
  ).then(res => res)
    .then(json => new Promise((resolve, reject) => {
      resolve(json)
    })).catch((err) => {
      console.log(err)
      return {}
    })
}

export const getTrackById = (id) => {
  return axios.get(
    `http://api.soundcloud.com/tracks/${id}.json?client_id=${CLIENT_ID}`
  ).then(res => res)
    .then(json => new Promise((resolve, reject) => {
      resolve(json)
    })).catch((err) => {
      console.log(err)
      return {}
    })
}

export const loadFavorites = ({limit = 20}) => {
  return axios.get(
    `https://api.soundcloud.com/users/${USER}/favorites?linked_partitioning=1&client_id=${CLIENT_ID}&limit=${limit}`
  ).then(res => res)
    .then(json => new Promise((resolve, reject) => {
      resolve(json)
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
