import React from "react"
import { Link } from "react-router-dom"

import SpotifyLoginButton from "./login/spotifyLoginButton"

type Props = {
  isLoggedIn: boolean
  onSpotifyLoginClick: () => void
}

const Header = (props: Props) => {
  return (
    <section className="section header">
      <div className="level">
        <div className="level-left">
          <h1 className="title is-1">
            <Link to="/" className="header-link">
              WPRB Rocks!
            </Link>
          </h1>
        </div>
        <div className="level-right">
          <SpotifyLoginButton
            onClick={props.onSpotifyLoginClick}
            isLoggedIn={props.isLoggedIn}
          />
        </div>
      </div>
      <h1 className="subtitle is-5">
        Listen to show playlists from WPRB, using Spotify
      </h1>
    </section>
  )
}

export default Header
