declare module 'react-spotify-web-playback' {
  export interface SpotifyPlayerProps {
    token: string
    uris?: string | string[]
    offset?: number
    play?: boolean
    showSaveIcon?: boolean
    magnifySliderOnHover?: boolean
    styles?: {
      activeColor?: string
      bgColor?: string
      color?: string
      loaderColor?: string
      sliderColor?: string
      sliderHandleColor?: string
      sliderTrackColor?: string
      trackArtistColor?: string
      trackNameColor?: string
    }
    callback?: (state: CallbackState) => void
  }

  export interface CallbackState {
    type: string
    deviceId: string
    isActive: boolean
    isPlaying: boolean
    errorType: string | null
    position: number
    progressMs: number
    durationMs: number
    track: {
      artists: Array<{ name: string; uri: string }>
      durationMs: number
      id: string
      image: string
      name: string
      uri: string
    }
  }

  export default function SpotifyPlayer(props: SpotifyPlayerProps): JSX.Element
}
