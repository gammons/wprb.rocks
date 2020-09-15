import React from "react"
import ReactDOM from "react-dom"
import Router from "./services/router"
import * as serviceWorker from "./serviceWorker"

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/graphql"
    : "https://api.wprb.rocks/graphql"

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
