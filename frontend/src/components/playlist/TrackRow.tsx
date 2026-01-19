import { Play, Volume2 } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface TrackRowProps {
  index: number
  name: string
  artistName: string
  albumName: string
  imageUrl?: string
  isPlaying?: boolean
  onClick: () => void
}

export default function TrackRow({
  index,
  name,
  artistName,
  albumName,
  imageUrl,
  isPlaying,
  onClick,
}: TrackRowProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group grid grid-cols-[auto_1fr] md:grid-cols-[auto_2fr_1fr_1fr] gap-4 items-center px-4 py-2 rounded-md cursor-pointer transition-all',
        isPlaying
          ? 'bg-primary/10 border-l-2 border-primary'
          : 'hover:bg-surface-hover border-l-2 border-transparent'
      )}
    >
      <div className="w-8 text-center">
        {isPlaying ? (
          <Volume2 className="h-4 w-4 mx-auto text-primary animate-pulse" />
        ) : (
          <>
            <span className="text-text-secondary group-hover:hidden">
              {index + 1}
            </span>
            <Play className="h-4 w-4 hidden group-hover:block mx-auto text-text-primary fill-current" />
          </>
        )}
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <Avatar
          src={imageUrl}
          alt={albumName}
          className={cn(
            "h-10 w-10 flex-shrink-0 transition-shadow",
            isPlaying && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
        />
        <div className="min-w-0">
          <p className={cn(
            'font-medium truncate',
            isPlaying ? 'text-primary' : 'text-text-primary'
          )}>
            {name}
          </p>
          <p className="text-sm text-text-secondary truncate md:hidden">
            {artistName}
          </p>
        </div>
      </div>

      <p className={cn(
        "text-sm truncate hidden md:block",
        isPlaying ? "text-primary/80" : "text-text-secondary"
      )}>
        {artistName}
      </p>

      <p className="text-sm text-text-secondary truncate hidden md:block">
        {albumName}
      </p>
    </div>
  )
}
