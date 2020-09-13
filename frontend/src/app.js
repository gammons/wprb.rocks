// @flow

import React from "react"
import { Link } from "react-router-dom"

import SpotifyLoginButton from "./components/login/spotifyLoginButton"
import Player from "./components/player"
import getUrlParam from "./services/getUrlParam"
import TokenManager from "./services/tokenManager"

import PlaylistContext from "./components/playlistContext"

import "./app.sass"

type Props = {
  children?: React.Node,
}

const redirectUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/spotify/authorize"
    : "https://api.wprb.rocks/spotify/authorize"

const SPOTIFY_CLIENT_ID = "dfe2abbeeee64a4193aeac98702a59d7"

const onSpotifyLoginClick = () => {
  const args = []
  args.push(`client_id=${SPOTIFY_CLIENT_ID}`)
  args.push("response_type=code")
  args.push(`redirect_uri=${redirectUrl}`)
  args.push("scope=streaming,user-read-email,user-read-private")

  window.location.replace(
    `https://accounts.spotify.com/authorize?${args.join("&")}`
  )
}

const App = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    TokenManager.hasAccessToken()
  )
  const [playlist, setPlaylist] = React.useState([])

  React.useEffect(() => {
    const _accessToken = getUrlParam("access_token")
    const _refreshToken = getUrlParam("refresh_token")

    if (!_accessToken) return

    TokenManager.setAccessToken(_accessToken)
    TokenManager.setRefreshToken(_refreshToken)

    setIsLoggedIn(true)
  }, [])

  return (
    <PlaylistContext.Provider value={{ playlist, setPlaylist }}>
      <section className="section">
        <div className="level">
          <div className="level-left">
            <h1 className="title is-1">
              <Link to="/">Wprb.rocks!</Link>
            </h1>
          </div>
          <div className="level-right">
            <SpotifyLoginButton
              onClick={onSpotifyLoginClick}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">{props.children}</div>
      </section>

      <section className="section">
        <Player accessTokenFn={TokenManager.accessTokenFn} />
      </section>

      <footer className="footer has-text-centered">
        <span>
          A simple,{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/gammons/wprb.rocks"
          >
            open-source
          </a>{" "}
          side project by{" "}
          <a target="_blank" rel="noreferrer" href="https://grant.dev">
            Grant Ammons
          </a>
        </span>
      </footer>
    </PlaylistContext.Provider>
  )
}

export default App
