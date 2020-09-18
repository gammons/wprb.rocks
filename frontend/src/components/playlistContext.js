// @flow

import React from "react"

const PlaylistContext = React.createContext({
  playlist: [],
  setPlaylist: () => {},
  songIndex: 0,
  setSongIndex: () => {},
})

export default PlaylistContext
