import { useState, useEffect, useCallback, useRef } from 'react'

interface Track {
  id: string
  uri: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  duration_ms: number
}

interface PlaybackState {
  paused: boolean
  position: number
  duration: number
  track: Track | null
}

interface SpotifySDKHook {
  isReady: boolean
  deviceId: string | null
  playbackState: PlaybackState
  play: (uris: string[], offset?: number) => Promise<void>
  pause: () => Promise<void>
  resume: () => Promise<void>
  seek: (positionMs: number) => Promise<void>
  setVolume: (volume: number) => Promise<void>
  previousTrack: () => Promise<void>
  nextTrack: () => Promise<void>
}

declare global {
  interface Window {
    Spotify: {
      Player: new (options: {
        name: string
        getOAuthToken: (cb: (token: string) => void) => void
        volume?: number
      }) => SpotifyPlayer
    }
    onSpotifyWebPlaybackSDKReady: () => void
  }
}

interface SpotifyPlayer {
  connect: () => Promise<boolean>
  disconnect: () => void
  addListener: (event: string, callback: (state: unknown) => void) => void
  removeListener: (event: string, callback?: (state: unknown) => void) => void
  getCurrentState: () => Promise<WebPlaybackState | null>
  setVolume: (volume: number) => Promise<void>
  pause: () => Promise<void>
  resume: () => Promise<void>
  togglePlay: () => Promise<void>
  seek: (positionMs: number) => Promise<void>
  previousTrack: () => Promise<void>
  nextTrack: () => Promise<void>
}

interface WebPlaybackState {
  paused: boolean
  position: number
  duration: number
  track_window: {
    current_track: {
      id: string
      uri: string
      name: string
      artists: { name: string }[]
      album: {
        name: string
        images: { url: string }[]
      }
      duration_ms: number
    }
  }
}

export function useSpotifySDK(token: string | null): SpotifySDKHook {
  const [isReady, setIsReady] = useState(false)
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    paused: true,
    position: 0,
    duration: 0,
    track: null,
  })

  const playerRef = useRef<SpotifyPlayer | null>(null)
  const tokenRef = useRef(token)

  // Keep token ref updated
  useEffect(() => {
    tokenRef.current = token
  }, [token])

  // Load Spotify SDK script
  useEffect(() => {
    if (!token) return

    const existingScript = document.getElementById('spotify-sdk')
    if (existingScript) return

    const script = document.createElement('script')
    script.id = 'spotify-sdk'
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Don't remove the script on cleanup as it causes issues
    }
  }, [token])

  // Initialize player when SDK is ready
  useEffect(() => {
    if (!token) return

    const initPlayer = () => {
      const player = new window.Spotify.Player({
        name: 'WPRB.rocks Player',
        getOAuthToken: (cb) => {
          cb(tokenRef.current || '')
        },
        volume: 0.5,
      })

      player.addListener('ready', (state: unknown) => {
        const { device_id } = state as { device_id: string }
        setDeviceId(device_id)
        setIsReady(true)
      })

      player.addListener('not_ready', () => {
        setDeviceId(null)
        setIsReady(false)
      })

      player.addListener('player_state_changed', (state: unknown) => {
        if (!state) return
        const playbackState = state as WebPlaybackState

        const currentTrack = playbackState.track_window.current_track
        setPlaybackState({
          paused: playbackState.paused,
          position: playbackState.position,
          duration: currentTrack?.duration_ms || 0,
          track: currentTrack ? {
            id: currentTrack.id,
            uri: currentTrack.uri,
            name: currentTrack.name,
            artists: currentTrack.artists,
            album: currentTrack.album,
            duration_ms: currentTrack.duration_ms,
          } : null,
        })
      })

      player.connect()
      playerRef.current = player
    }

    if (window.Spotify) {
      initPlayer()
    } else {
      window.onSpotifyWebPlaybackSDKReady = initPlayer
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect()
        playerRef.current = null
      }
    }
  }, [token])

  // Update position periodically while playing
  useEffect(() => {
    if (playbackState.paused || !playerRef.current) return

    const interval = setInterval(async () => {
      const state = await playerRef.current?.getCurrentState()
      if (state) {
        setPlaybackState(prev => ({
          ...prev,
          position: state.position,
        }))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [playbackState.paused])

  const play = useCallback(async (uris: string[], offset = 0) => {
    if (!deviceId || !token) return

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris,
        offset: { position: offset },
      }),
    })
  }, [deviceId, token])

  const pause = useCallback(async () => {
    await playerRef.current?.pause()
  }, [])

  const resume = useCallback(async () => {
    await playerRef.current?.resume()
  }, [])

  const seek = useCallback(async (positionMs: number) => {
    await playerRef.current?.seek(positionMs)
  }, [])

  const setVolume = useCallback(async (volume: number) => {
    await playerRef.current?.setVolume(volume)
  }, [])

  const previousTrack = useCallback(async () => {
    await playerRef.current?.previousTrack()
  }, [])

  const nextTrack = useCallback(async () => {
    await playerRef.current?.nextTrack()
  }, [])

  return {
    isReady,
    deviceId,
    playbackState,
    play,
    pause,
    resume,
    seek,
    setVolume,
    previousTrack,
    nextTrack,
  }
}
