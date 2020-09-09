// @flow

import React from "react"
import { Router, Route } from "react-router-dom"
import { createBrowserHistory } from "history"

import App from "../app"
import Index from "../pages/index"
import Show from "../pages/show"

const history = createBrowserHistory()

const Routes = () => {
  return (
    <Router history={history}>
      <App>
        <Route exact={true} path="/show/:slug" component={Show} />
        <Route exact={true} path="/show/:slug/:date" component={Show} />
        <Route exact={true} path="/" component={Index} />
      </App>
    </Router>
  )
}

export default Routes
