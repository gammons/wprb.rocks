// @flow
import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

type Props = {
  artist: string,
  artistId: string,
  album: string,
  trackTitle: string,
}

const ArtistAndTrack = (props: Props) => {
  if (!props.artist && !props.trackTitle) return null

  return (
    <div className="artist-track-name">
      <span className="track-name">{props.trackTitle}</span>
      <br />
      <span className="artist-name">
        {props.artist}{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://open.spotify.com/artist/${props.artistId}`}
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      </span>
    </div>
  )
}

export default ArtistAndTrack
