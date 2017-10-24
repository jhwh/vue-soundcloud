import _ from 'lodash'
const trunc = (str, n) => {
  return (_.isString(str) && str.length > n) ? str.substr(0, n - 1) + '...' : str
}
const changeImageSize = (str, size) => {
  return !_.isNull(str) ? str.replace('large', `t${size}x${size}`) : ''
}
export const changeImageSizes = (songs) => {
  let playlist = Array.from(songs)
  playlist.map((track, index) => {
    if (_.isNull(track.artwork_url)) {
      track.artwork_url = `https://source.unsplash.com/${500 + index}x${500 + index}/?music`
    } else {
      track.artwork_url = changeImageSize(track.artwork_url, 500)
    }
    track.description = trunc(track.description, 100)
  })
  return playlist
}
