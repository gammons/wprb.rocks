import React, { createContext, useContext, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { useSpotifySDK } from '@/hooks/useSpotifySDK'

interface Track {
  id: string
  name: string
  artistName: string
  albumName: string
  imageUrl?: string
  spotifySongId: string
}

interface CurrentTrack {
  id: string
  uri: string
  name: string
  artistName: string
  albumName: string
  imageUrl: string
  duration: number
}

interface PlayerContextType {
  // State
  isReady: boolean
  isPlaying: boolean
  currentTrack: CurrentTrack | null
  position: number
  duration: number
  volume: number

  // Actions
  playTracks: (tracks: Track[], startIndex?: number) => void
  pause: () => void
  resume: () => void
  togglePlay: () => void
  seek: (positionMs: number) => void
  setVolume: (volume: number) => void
  previousTrack: () => void
  nextTrack: () => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuth()
  const [volume, setVolumeState] = React.useState(0.5)

  const {
    isReady,
    playbackState,
    play,
    pause,
    resume,
    seek,
    setVolume: setSDKVolume,
    previousTrack: sdkPrevious,
    nextTrack: sdkNext,
  } = useSpotifySDK(accessToken)

  const currentTrack: CurrentTrack | null = playbackState.track ? {
    id: playbackState.track.id,
    uri: playbackState.track.uri,
    name: playbackState.track.name,
    artistName: playbackState.track.artists.map(a => a.name).join(', '),
    albumName: playbackState.track.album.name,
    imageUrl: playbackState.track.album.images[0]?.url || '',
    duration: playbackState.track.duration_ms,
  } : null

  const playTracks = useCallback((tracks: Track[], startIndex = 0) => {
    const uris = tracks
      .filter(t => t.spotifySongId)
      .map(t => `spotify:track:${t.spotifySongId}`)

    if (uris.length > 0) {
      play(uris, startIndex)
    }
  }, [play])

  const togglePlay = useCallback(() => {
    if (playbackState.paused) {
      resume()
    } else {
      pause()
    }
  }, [playbackState.paused, pause, resume])

  const handleSetVolume = useCallback((vol: number) => {
    setVolumeState(vol)
    setSDKVolume(vol)
  }, [setSDKVolume])

  return (
    <PlayerContext.Provider
      value={{
        isReady,
        isPlaying: !playbackState.paused,
        currentTrack,
        position: playbackState.position,
        duration: playbackState.duration,
        volume,
        playTracks,
        pause,
        resume,
        togglePlay,
        seek,
        setVolume: handleSetVolume,
        previousTrack: sdkPrevious,
        nextTrack: sdkNext,
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
