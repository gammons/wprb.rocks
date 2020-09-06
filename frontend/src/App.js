import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

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
  return (
    <React.Fragment>
      <p>Here I am!</p>
      <Query query={Q}>
        {({ loading, error, data }) => {
          console.log("error is", error)
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>

          return (
            <ul>
              {data.playlists.map((playlist, idx) => {
                return <li key={idx}>{playlist.name}</li>
              })}
            </ul>
          )
        }}
      </Query>
    </React.Fragment>
  )
}

export default App
