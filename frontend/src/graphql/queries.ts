import { gql } from '@apollo/client'

export const PLAYLIST_FRAGMENT = gql`
  fragment PlaylistFields on Playlist {
    id
    name
    slug
    date
    timeslot
    imageUrl
    dj {
      id
      name
    }
  }
`

export const SONG_FRAGMENT = gql`
  fragment SongFields on Song {
    id
    name
    artistName
    albumName
    imageUrl
    spotifySongId
    spotifyArtistId
    spotifyAlbumId
  }
`

export const GET_PLAYLISTS_BY_DATE = gql`
  ${PLAYLIST_FRAGMENT}
  query GetPlaylistsByDate($date: String!) {
    playlistsByDate(date: $date) {
      ...PlaylistFields
    }
  }
`

export const GET_PLAYLIST = gql`
  ${PLAYLIST_FRAGMENT}
  ${SONG_FRAGMENT}
  query GetPlaylist($slug: String!, $date: String!) {
    playlist(slug: $slug, date: $date) {
      ...PlaylistFields
      songs {
        ...SongFields
      }
    }
  }
`

export const GET_PLAYLISTS_BY_SLUG = gql`
  ${PLAYLIST_FRAGMENT}
  query GetPlaylistsBySlug($slug: String!) {
    playlists(slug: $slug) {
      ...PlaylistFields
    }
  }
`
