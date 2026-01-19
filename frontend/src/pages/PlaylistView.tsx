import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PLAYLIST, GET_PLAYLISTS_BY_DATE } from '@/graphql/queries'
import PlaylistHeader from '@/components/playlist/PlaylistHeader'
import TrackList from '@/components/playlist/TrackList'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usePlayer } from '@/context/PlayerContext'

export default function PlaylistView() {
  const { date, slug } = useParams()
  const { isAuthenticated } = useAuth()
  const { playTracks, currentTrack } = usePlayer()

  const { loading, error, data } = useQuery(GET_PLAYLIST, {
    variables: { slug, date },
    skip: !slug || !date,
  })

  const { data: dayData } = useQuery(GET_PLAYLISTS_BY_DATE, {
    variables: { date },
    skip: !date,
  })

  if (loading) {
    return (
      <div>
        <div className="flex gap-6 mb-8">
          <Skeleton className="w-48 h-48 rounded-md flex-shrink-0" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-24 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Failed to load playlist</p>
        <p className="text-sm text-text-muted mt-2">{error.message}</p>
      </div>
    )
  }

  const playlistData = data?.playlist
  if (!playlistData) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Playlist not found</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  const tracks = (playlistData.songs || []).map((song: {
    id: string
    name: string
    artistName: string
    albumName: string
    imageUrl?: string
    spotifySongId: string
  }) => ({
    id: song.id,
    name: song.name,
    artistName: song.artistName,
    albumName: song.albumName,
    imageUrl: song.imageUrl,
    spotifySongId: song.spotifySongId,
  }))

  const handlePlayAll = () => {
    if (!isAuthenticated) {
      alert('Please login with Spotify to play music!')
      return
    }
    playTracks(tracks, 0)
  }

  const handleTrackClick = (index: number) => {
    if (!isAuthenticated) {
      alert('Please login with Spotify to play music!')
      return
    }
    playTracks(tracks, index)
  }

  // Find prev/next shows for navigation
  const dayPlaylists = dayData?.playlistsByDate || []
  const currentIndex = dayPlaylists.findIndex((p: { slug: string }) => p.slug === slug)
  const prevPlaylist = currentIndex > 0 ? dayPlaylists[currentIndex - 1] : null
  const nextPlaylist = currentIndex < dayPlaylists.length - 1 ? dayPlaylists[currentIndex + 1] : null

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Link to={`/${date}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          {prevPlaylist ? (
            <Link to={`/${date}/show/${prevPlaylist.slug}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous show</span>
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled className="gap-1">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {nextPlaylist ? (
            <Link to={`/${date}/show/${nextPlaylist.slug}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <span className="hidden sm:inline">Next show</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled className="gap-1">
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Spacer to balance the layout */}
        <div className="w-[70px]" />
      </div>

      <PlaylistHeader
        name={playlistData.name}
        slug={playlistData.slug}
        date={playlistData.date}
        djName={playlistData.dj?.name}
        trackCount={tracks.length}
        imageUrl={playlistData.imageUrl}
        synopsis={playlistData.synopsis}
        onPlay={handlePlayAll}
        isPlayable={isAuthenticated}
      />

      {tracks.length > 0 ? (
        <TrackList
          tracks={tracks}
          currentTrackUri={currentTrack?.uri}
          onTrackClick={handleTrackClick}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-text-secondary">No tracks in this playlist</p>
        </div>
      )}
    </div>
  )
}
