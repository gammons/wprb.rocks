import "./app.sass"
import SpotifyLoginButton from "./components/login/spotifyLoginButton"
import Player from "./components/player"

import React from "react"
import { useQuery, gql } from "@apollo/client"

const Q = gql`
  {
    playlists {
      dj {
        name
      }
      songs {
        name
        albumName
        artistName
        spotifyArtistId
        spotifyAlbumId
        spotifySongId
        imageUrl
      }
      name
      createdAt
    }
  }
`

const App = () => {
  const { loading, error, data } = useQuery(Q)
  if (loading) return <div>Fetching..</div>
  if (error) return <div>Error!</div>

  return (
    <React.Fragment>
      <SpotifyLoginButton />
      <p>Here I am!</p>
      <button className="button is-primary">Primary button</button>
      <ul>
        {data.playlists.map((playlist, idx) => {
          return <li key={idx}>{playlist.name}</li>
        })}
      </ul>
      <Player />
    </React.Fragment>
  )
}

export default App
