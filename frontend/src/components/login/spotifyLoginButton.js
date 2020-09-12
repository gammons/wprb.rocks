// @flow
import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpotify } from "@fortawesome/free-brands-svg-icons"

type Props = {
  onClick: () => void,
}

const SpotifyLoginButton = (props: Props) => {
  return (
    <button onClick={props.onClick} className="button">
      <span className="icon">
        <FontAwesomeIcon icon={faSpotify} />
      </span>
      <span>Login with Spotify</span>
    </button>
  )
}

export default SpotifyLoginButton
