import React from "react"
import { Router, Route } from "react-router-dom"
import { createBrowserHistory } from "history"

import App from "../app"
import Shows from "../pages/shows"
import ShowIndex from "../pages/showIndex"
import Playlist from "../pages/playlist"

const history = createBrowserHistory()

const Routes = () => {
  return (
    <Router history={history}>
      <App>
        <Route exact={true} path="/show/:slug" component={ShowIndex} />
        <Route exact={true} path="/:date/show/:slug" component={Playlist} />
        <Route exact={true} path="/:date" component={Shows} />

        <Route exact={true} path="/" component={Shows} />
      </App>
    </Router>
  )
}

export default Routes
