import { useAuth } from '@/context/AuthContext'
import { usePlayer } from '@/context/PlayerContext'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function PlayerBar() {
  const { accessToken } = useAuth()
  const { playlist, currentTrackIndex, isPlaying, setPlayerState } = usePlayer()

  if (!accessToken) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface border-t border-surface-hover">
        <div className="flex items-center justify-center h-full text-text-secondary">
          Login with Spotify to enable playback
        </div>
      </div>
    )
  }

  const uris = playlist.length > 0 ? playlist : undefined
  const offset = currentTrackIndex

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-hover">
      <SpotifyPlayer
        token={accessToken}
        uris={uris}
        offset={offset}
        play={isPlaying}
        showSaveIcon
        magnifySliderOnHover
        styles={{
          activeColor: '#1DB954',
          bgColor: '#181818',
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
  )
}
