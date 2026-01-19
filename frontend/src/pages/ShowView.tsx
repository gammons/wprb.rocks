import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PLAYLISTS_BY_SLUG } from '@/graphql/queries'
import EpisodeCard from '@/components/show/EpisodeCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Music } from 'lucide-react'

export default function ShowView() {
  const { slug } = useParams()

  const { loading, error, data } = useQuery(GET_PLAYLISTS_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  })

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-6 mb-8">
          <Skeleton className="w-48 h-48 rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Failed to load show</p>
        <p className="text-sm text-text-muted mt-2">{error.message}</p>
      </div>
    )
  }

  const playlists = data?.playlists || []
  const showName = playlists[0]?.name || 'Unknown Show'
  const djName = playlists[0]?.dj?.name

  if (playlists.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Show not found</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-surface rounded-md flex items-center justify-center shadow-xl">
          <Music className="h-24 w-24 text-primary" />
        </div>
        <div className="text-center md:text-left">
          <span className="text-xs uppercase tracking-wider text-text-secondary mb-2 block">
            Show
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-2">
            {showName}
          </h1>
          {djName && (
            <p className="text-text-secondary">with {djName}</p>
          )}
          <p className="text-sm text-text-muted mt-2">
            {playlists.length} episode{playlists.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-text-primary mb-4">Episodes</h2>
      <div className="space-y-2">
        {playlists.map((playlist: {
          id: string
          date: string
          slug: string
          timeslot?: string
        }) => (
          <EpisodeCard
            key={playlist.id}
            date={playlist.date}
            slug={playlist.slug}
            timeslot={playlist.timeslot}
          />
        ))}
      </div>
    </div>
  )
}
