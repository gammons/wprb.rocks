import React, { createContext, useContext, useState, useCallback } from 'react'
import type { CallbackState } from 'react-spotify-web-playback'

interface Track {
  id: string
  name: string
  artistName: string
  albumName: string
  imageUrl: string
  spotifySongId: string
}

interface PlayerContextType {
  playlist: string[]
  currentTrackIndex: number
  isPlaying: boolean
  currentTrack: CallbackState['track'] | null
  position: number
  duration: number
  setPlaylist: (uris: string[], startIndex?: number) => void
  playTrack: (index: number) => void
  setIsPlaying: (playing: boolean) => void
  setPlayerState: (state: CallbackState) => void
  loadPlaylistFromTracks: (tracks: Track[], startIndex?: number) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [playlist, setPlaylistState] = useState<string[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<CallbackState['track'] | null>(null)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)

  const setPlaylist = useCallback((uris: string[], startIndex = 0) => {
    setPlaylistState(uris)
    setCurrentTrackIndex(startIndex)
    setIsPlaying(true)
  }, [])

  const playTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
  }, [])

  const setPlayerState = useCallback((state: CallbackState) => {
    setIsPlaying(state.isPlaying)
    setCurrentTrack(state.track)
    setPosition(state.progressMs)
    setDuration(state.durationMs)
  }, [])

  const loadPlaylistFromTracks = useCallback((tracks: Track[], startIndex = 0) => {
    const uris = tracks
      .filter(t => t.spotifySongId)
      .map(t => `spotify:track:${t.spotifySongId}`)
    setPlaylist(uris, startIndex)
  }, [setPlaylist])

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        currentTrackIndex,
        isPlaying,
        currentTrack,
        position,
        duration,
        setPlaylist,
        playTrack,
        setIsPlaying,
        setPlayerState,
        loadPlaylistFromTracks,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
