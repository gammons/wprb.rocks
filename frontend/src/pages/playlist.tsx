import React from "react"
import { useQuery, gql } from "@apollo/client"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

import PlaylistContext from "../components/playlistContext"

import TokenManager from "../services/tokenManager"

import "./css/playlist.css"

const Playlist = (props: any) => {
  const { setPlaylist, setSongIndex } = React.useContext(PlaylistContext)

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
        slug
      }
    }
  `

  const { loading, error, data } = useQuery(q)
  if (loading) return <div>Fetching..</div>
  if (error) return <div>Error!</div>

  const showName = data.playlist.name
  const djName = data.playlist.dj.name

  const airDate = new Date(data.playlist.date + "T12:00:00")
  const prettyAirDate = airDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const onLoadPlaylist = (idx = 0) => {
    if (TokenManager.hasAccessToken()) {
      setSongIndex(idx)
      setPlaylist(data.playlist.songs.map((s) => s.spotifySongId))
    } else {
      alert("Please login with Spotify before loading playlists!")
    }
  }

  return (
    <React.Fragment>
      <h1 className="title">
        {showName} with {djName}
      </h1>
      <h2 className="subtitle">
        {prettyAirDate}{" "}
        <Link to={`/show/${data.playlist.slug}`}>See other airdates</Link>
      </h2>

      <div className="container has-text-centered">
        <button
          onClick={() => {
            onLoadPlaylist(0)
          }}
          className="button is-primary"
        >
          <span className="icon">
            <FontAwesomeIcon icon={faPlay} />
          </span>
          <span>Play this playlist</span>
        </button>
      </div>

      <ul>
        {data.playlist.songs.map((song, idx) => {
          return (
            <li className="track" key={idx}>
              <span className="tracknum">{idx + 1}.</span>
              <a onClick={() => onLoadPlaylist(idx)}>
                <img className="album-img" src={song.imageUrl} />
              </a>
              <a onClick={() => onLoadPlaylist(idx)}>
                <span className="songname">{song.name}</span>
              </a>
              <p>&nbsp; by {song.artistName}</p>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export default Playlist
