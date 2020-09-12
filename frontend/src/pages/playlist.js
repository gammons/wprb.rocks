// @flow

import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

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

  const airDate = new Date(data.playlist.date)
  const prettyAirDate = airDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <React.Fragment>
      <h1 className="title">
        {showName} with {djName}
      </h1>
      <h2 className="subtitle">{prettyAirDate}</h2>

      <div className="container has-text-centered">
        <button className="button is-primary">
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
              <img className="album-img" src={song.imageUrl} />
              <p>
                <span className="songname">{song.name}</span> by{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://open.spotify.com/artist/${song.spotifyArtistId}`}
                >
                  {song.artistName}
                </a>
              </p>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export default Playlist
