// @flow

import React from "react"
import { Link } from "react-router-dom"

import SpotifyLoginButton from "./components/login/spotifyLoginButton"
import Player from "./components/player"

import "./app.sass"

type Props = {
  children?: React.Node,
}

const App = (props: Props) => {
  return (
    <React.Fragment>
      <section className="section">
        <div className="level">
          <div className="level-left">
            <h1 className="title is-1">
              <Link to="/">Wprb.rocks!</Link>
            </h1>
          </div>
          <div className="level-right">
            <SpotifyLoginButton />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-fluid">{props.children}</div>
      </section>

      <footer className="footer">
        <Player />
      </footer>
    </React.Fragment>
  )
}

export default App
