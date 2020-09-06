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
      <p>Here I am!</p>
      <ul>
        {data.playlists.map((playlist, idx) => {
          return <li key={idx}>{playlist.name}</li>
        })}
      </ul>
    </React.Fragment>
  )
}

export default App
