import TrackRow from './TrackRow'

interface Track {
  id: string
  name: string
  artistName: string
  albumName: string
  imageUrl?: string
  spotifySongId: string
}

interface TrackListProps {
  tracks: Track[]
  currentTrackUri?: string
  onTrackClick: (index: number) => void
}

export default function TrackList({ tracks, currentTrackUri, onTrackClick }: TrackListProps) {
  return (
    <div>
      <div className="grid grid-cols-[auto_1fr_1fr] md:grid-cols-[auto_2fr_1fr_1fr] gap-4 px-4 py-2 border-b border-surface-hover text-xs uppercase tracking-wider text-text-muted">
        <span className="w-8 text-center">#</span>
        <span>Title</span>
        <span className="hidden md:block">Artist</span>
        <span className="hidden md:block">Album</span>
      </div>
      <div className="mt-2">
        {tracks.map((track, index) => (
          <TrackRow
            key={track.id}
            index={index}
            name={track.name}
            artistName={track.artistName}
            albumName={track.albumName}
            imageUrl={track.imageUrl}
            isPlaying={currentTrackUri === `spotify:track:${track.spotifySongId}`}
            onClick={() => onTrackClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
