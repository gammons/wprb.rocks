import React from "react"

const PlaylistContext = React.createContext({
  playlist: [],
  setPlaylist: (state: never[]) => {},
  songIndex: 0,
  setSongIndex: (state: number) => {},
})

export default PlaylistContext
