import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PLAYLISTS_BY_SLUG } from '@/graphql/queries'
import EpisodeCard from '@/components/show/EpisodeCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Radio } from 'lucide-react'

export default function ShowView() {
  const { slug } = useParams()

  const { loading, error, data } = useQuery(GET_PLAYLISTS_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  })

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-32 mb-6" />
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

      <div className="mb-6">
        <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
          <Radio className="h-4 w-4" />
          <span>Show</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-text-primary">
          {showName}
        </h1>
        {djName && (
          <p className="text-text-secondary mt-1">with {djName}</p>
        )}
        <p className="text-sm text-text-muted mt-1">
          {playlists.length} episode{playlists.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-1">
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
