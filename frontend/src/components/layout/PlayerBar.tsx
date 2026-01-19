import { useAuth } from '@/context/AuthContext'
import { usePlayer } from '@/context/PlayerContext'
import SpotifyPlayer from 'react-spotify-web-playback'
import { Music } from 'lucide-react'

export default function PlayerBar() {
  const { accessToken } = useAuth()
  const { playlist, currentTrackIndex, isPlaying, setPlayerState, currentTrack } = usePlayer()

  if (!accessToken) {
    return (
      <div className="fixed bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="h-20 bg-gradient-to-t from-surface to-surface/95 backdrop-blur-sm">
          <div className="flex items-center justify-center h-full text-text-secondary gap-2">
            <Music className="h-4 w-4" />
            <span>Login with Spotify to enable playback</span>
          </div>
        </div>
      </div>
    )
  }

  const uris = playlist.length > 0 ? playlist : undefined
  const offset = currentTrackIndex

  return (
    <div className="fixed bottom-0 left-0 right-0">
      {currentTrack && (
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      )}
      <div className="bg-gradient-to-t from-surface to-surface/95 backdrop-blur-sm">
        <SpotifyPlayer
          token={accessToken}
          uris={uris}
          offset={offset}
          play={isPlaying}
          showSaveIcon
          magnifySliderOnHover
          styles={{
            activeColor: '#1DB954',
            bgColor: 'transparent',
            color: '#FFFFFF',
            loaderColor: '#1DB954',
            sliderColor: '#1DB954',
            sliderHandleColor: '#FFFFFF',
            sliderTrackColor: '#535353',
            trackArtistColor: '#B3B3B3',
            trackNameColor: '#FFFFFF',
          }}
          callback={(state) => {
            if (state.type === 'player_update') {
              setPlayerState(state)
            }
          }}
        />
      </div>
    </div>
  )
}
