// @flow

import React from "react"

import { useQuery, gql } from "@apollo/client"

import "./css/playlist.css"

const Playlist = (props: any) => {
  const slug = props.match.params.slug
  const date = props.match.params.date

  const q = gql`
    {
      playlist(slug: "${slug}", date: "${date}" ) {
        dj {
          name
        }
        songs {
          name
          albumName
          artistName
          imageUrl

          spotifyAlbumId
          spotifyArtistId
          spotifySongId
        }

        id
        name
        date
      }
    }
  `

  const { loading, error, data } = useQuery(q)
  if (loading) return <div>Fetching..</div>
  if (error) return <div>Error!</div>

  const showName = data.playlist.name
  const djName = data.playlist.dj.name

  return (
    <React.Fragment>
      <h1 className="title">
        {showName} with {djName}
      </h1>
      <h2 className="subtitle">Airdate: {data.playlist.date}</h2>
      <ul>
        {data.playlist.songs.map((song, idx) => {
          return (
            <li key={idx}>
              <img className="album-img" src={song.imageUrl} />
              <p>
                {song.name} by {song.artistName}
              </p>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export default Playlist
