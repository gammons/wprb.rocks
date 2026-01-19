import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Play, Music } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface PlaylistHeaderProps {
  name: string
  slug: string
  date: string
  djName?: string
  trackCount: number
  imageUrl?: string
  synopsis?: string
  onPlay: () => void
  isPlayable: boolean
}

export default function PlaylistHeader({
  name,
  slug,
  date,
  djName,
  trackCount,
  imageUrl,
  synopsis,
  onPlay,
  isPlayable,
}: PlaylistHeaderProps) {
  const displayDate = formatDate(new Date(date + 'T12:00:00'))

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
          <p className="text-text-secondary mb-1">with {djName}</p>
        )}
        <p className="text-sm text-text-secondary mb-4">
          {displayDate} • {trackCount} tracks •{' '}
          <Link to={`/show/${slug}`} className="hover:underline hover:text-text-primary">
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
        <div>
          <Button
            size="lg"
            onClick={onPlay}
            disabled={!isPlayable || trackCount === 0}
            className="gap-2"
          >
            <Play className="h-5 w-5 fill-current" />
            Play
          </Button>
        </div>
      </div>
    </div>
  )
}
