// @flow

import React from "react"

const PlaylistContext = React.createContext({
  playlist: [],
  setPlaylist: () => {},
})

export default PlaylistContext
