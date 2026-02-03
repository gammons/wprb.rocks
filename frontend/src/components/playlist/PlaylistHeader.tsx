import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Play, Music, Plus, Check, Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { format, parseISO } from 'date-fns'

interface PlaylistHeaderProps {
  name: string
  slug: string
  date: string
  createdAt?: string
  djName?: string
  trackCount: number
  imageUrl?: string
  synopsis?: string
  onPlay: () => void
  onSaveToSpotify?: () => void
  isPlayable: boolean
  saveStatus?: 'idle' | 'saving' | 'saved' | 'error'
}

export default function PlaylistHeader({
  name,
  slug,
  date,
  createdAt,
  djName,
  trackCount,
  imageUrl,
  synopsis,
  onPlay,
  onSaveToSpotify,
  isPlayable,
  saveStatus = 'idle',
}: PlaylistHeaderProps) {
  const displayDate = formatDate(new Date(date + 'T12:00:00'))
  const airTime = createdAt ? format(parseISO(createdAt), 'h:mm a') : null

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-md shadow-xl mx-auto md:mx-0 object-cover"
        />
      ) : (
        <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-primary/20 to-surface rounded-md flex items-center justify-center shadow-xl mx-auto md:mx-0">
          <Music className="h-24 w-24 text-primary" />
        </div>
      )}
      <div className="flex flex-col justify-end text-center md:text-left">
        <span className="text-xs uppercase tracking-wider text-text-secondary mb-2">
          Playlist
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-2">
          {name}
        </h1>
        {djName && (
          <p className="text-lg text-text-secondary mb-1">with {djName}</p>
        )}
        <p className="text-sm text-text-secondary mb-4">
          {displayDate}{airTime && ` at ${airTime}`} • {trackCount} tracks •{' '}
          <Link to={`/show/${slug}`} className="text-primary underline hover:text-primary/80">
            See other airdates
          </Link>
        </p>
        {synopsis && (
          <div className="mb-4 text-sm">
            {synopsis.split('\n').map((line, i) => {
              if (line.startsWith('Genre:')) {
                return (
                  <span key={i} className="inline-block bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-medium mr-2">
                    {line.replace('Genre: ', '')}
                  </span>
                )
              }
              return (
                <span key={i} className="text-text-secondary italic">
                  {line}
                </span>
              )
            })}
          </div>
        )}
        <div className="flex gap-2">
          <Button
            size="lg"
            onClick={onPlay}
            disabled={!isPlayable || trackCount === 0}
            className="gap-2"
          >
            <Play className="h-5 w-5 fill-current" />
            Play
          </Button>
          {onSaveToSpotify && (
            <Button
              size="lg"
              variant="outline"
              onClick={onSaveToSpotify}
              disabled={!isPlayable || trackCount === 0 || saveStatus === 'saving' || saveStatus === 'saved'}
              className="gap-2"
            >
              {saveStatus === 'saving' && <Loader2 className="h-5 w-5 animate-spin" />}
              {saveStatus === 'saved' && <Check className="h-5 w-5" />}
              {(saveStatus === 'idle' || saveStatus === 'error') && <Plus className="h-5 w-5" />}
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save to Spotify'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
