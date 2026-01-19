import { useAuth } from '@/context/AuthContext'
import { usePlayer } from '@/context/PlayerContext'
import { Slider } from '@/components/ui/slider'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from 'lucide-react'
import { cn } from '@/lib/utils'

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function PlayerBar() {
  const { isAuthenticated } = useAuth()
  const {
    isReady,
    isPlaying,
    currentTrack,
    position,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    previousTrack,
    nextTrack,
  } = usePlayer()

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-surface-hover to-transparent" />
        <div className="h-20 bg-gradient-to-t from-black/90 to-black/70 backdrop-blur-lg">
          <div className="flex items-center justify-center h-full text-text-secondary gap-2">
            <Music className="h-4 w-4" />
            <span>Login with Spotify to enable playback</span>
          </div>
        </div>
      </div>
    )
  }

  const progress = duration > 0 ? (position / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0">
      {/* Progress bar at top of player */}
      <div className="h-1 bg-surface-hover">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-gradient-to-t from-black to-surface/95 backdrop-blur-lg">
        <div className="flex items-center h-20 px-4 gap-4">
          {/* Album Art & Track Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {currentTrack?.imageUrl ? (
              <img
                src={currentTrack.imageUrl}
                alt={currentTrack.albumName}
                className="h-14 w-14 rounded shadow-lg object-cover"
              />
            ) : (
              <div className="h-14 w-14 rounded bg-surface-hover flex items-center justify-center">
                <Music className="h-6 w-6 text-text-muted" />
              </div>
            )}
            {currentTrack ? (
              <div className="min-w-0">
                <p className="font-medium text-text-primary truncate">
                  {currentTrack.name}
                </p>
                <p className="text-sm text-text-secondary truncate">
                  {currentTrack.artistName}
                </p>
              </div>
            ) : (
              <div className="min-w-0">
                <p className="text-text-secondary">
                  {isReady ? 'Select a track to play' : 'Connecting to Spotify...'}
                </p>
              </div>
            )}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={previousTrack}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              disabled={!currentTrack}
            >
              <SkipBack className="h-5 w-5" />
            </button>

            <button
              onClick={togglePlay}
              className={cn(
                "p-3 rounded-full transition-all",
                currentTrack
                  ? "bg-white text-black hover:scale-105"
                  : "bg-surface-hover text-text-muted"
              )}
              disabled={!currentTrack}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              disabled={!currentTrack}
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          {/* Time & Progress (desktop only) */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <span className="text-xs text-text-muted w-10 text-right">
              {formatTime(position)}
            </span>
            <Slider
              value={position}
              max={duration || 100}
              onChange={(value) => seek(value)}
              className="flex-1"
            />
            <span className="text-xs text-text-muted w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume (desktop only) */}
          <div className="hidden md:flex items-center gap-2 w-32">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
              className="p-1 text-text-secondary hover:text-text-primary transition-colors"
            >
              {volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <Slider
              value={volume * 100}
              max={100}
              onChange={(value) => setVolume(value / 100)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
