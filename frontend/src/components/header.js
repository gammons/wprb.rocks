// @flow

import React from "react"
import { Link } from "react-router-dom"

import SpotifyLoginButton from "./login/spotifyLoginButton"

type Props = {
  isLoggedIn: boolean,
  onSpotifyLoginClick: () => void,
}

const Header = (props: Props) => {
  return (
    <section className="section header">
      <div className="level">
        <div className="level-left">
          <Link to="/">
            <img className="header-img" src="/wprb.png" />
          </Link>
          <h1 className="title is-1">
            <Link to="/" className="header-link">
              Rocks!
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
    </section>
  )
}

export default Header
