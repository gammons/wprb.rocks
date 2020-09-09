// @flow

import "./app.sass"
import SpotifyLoginButton from "./components/login/spotifyLoginButton"
import Player from "./components/player"

import React from "react"

type Props = {
  children?: React.Node,
}

const App = (props: Props) => {
  return (
    <React.Fragment>
      <h1>Wprb.rocks!</h1>
      <SpotifyLoginButton />

      {props.children}

      <Player />
    </React.Fragment>
  )
}

export default App
