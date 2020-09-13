// @flow
import React from "react"

type Props = {
  artist: string,
  album: string,
  trackTitle: string,
}

const ArtistAndTrack = (props: Props) => {
  if (!props.artist && !props.trackTitle) return null

  return (
    <div className="artist-track-name">
      <span className="track-name">{props.trackTitle}</span>
      <br />
      <span className="artist-name">{props.artist}</span>
    </div>
  )
}

export default ArtistAndTrack
