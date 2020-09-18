// @flow

import React from "react"

import Player from "./components/player"
import Header from "./components/header"
import getUrlParam from "./services/getUrlParam"
import TokenManager from "./services/tokenManager"

import PlaylistContext from "./components/playlistContext"

import "./app.scss"

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
  const [songIndex, setSongIndex] = React.useState(0)

  React.useEffect(() => {
    const _accessToken = getUrlParam("access_token")
    const _refreshToken = getUrlParam("refresh_token")

    if (!_accessToken) return

    TokenManager.setAccessToken(_accessToken)
    TokenManager.setRefreshToken(_refreshToken)

    setIsLoggedIn(true)
  }, [])

  return (
    <PlaylistContext.Provider
      value={{ playlist, setPlaylist, songIndex, setSongIndex }}
    >
      <div className="app">
        <Header
          onSpotifyLoginClick={onSpotifyLoginClick}
          isLoggedIn={isLoggedIn}
        />

        <section className="section main">
          <div className="container">
            <div className="box">{props.children}</div>
          </div>
        </section>

        <section className="section player">
          <Player accessTokenFn={TokenManager.accessTokenFn} />
        </section>
      </div>
    </PlaylistContext.Provider>
  )
}

export default App
