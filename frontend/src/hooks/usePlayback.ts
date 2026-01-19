import { usePlayer } from '@/context/PlayerContext'
import { useAuth } from '@/context/AuthContext'

interface Track {
  id: string
  name: string
  artistName: string
  albumName: string
  imageUrl: string
  spotifySongId: string
}

export function usePlayback() {
  const { isAuthenticated } = useAuth()
  const {
    playlist,
    currentTrackIndex,
    isPlaying,
    currentTrack,
    position,
    duration,
    setPlaylist,
    playTrack,
    loadPlaylistFromTracks,
  } = usePlayer()

  const playPlaylist = (tracks: Track[], startIndex = 0) => {
    if (!isAuthenticated) {
      alert('Please login with Spotify before playing!')
      return
    }
    loadPlaylistFromTracks(tracks, startIndex)
  }

  return {
    isReady: isAuthenticated,
    isPlaying,
    currentTrack,
    position,
    duration,
    playlist,
    currentTrackIndex,
    playPlaylist,
    playTrack,
    setPlaylist,
  }
}
