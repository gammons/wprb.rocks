import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PLAYLISTS_BY_DATE } from '@/graphql/queries'
import ShowCard from '@/components/show/ShowCard'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDateISO, getYesterday, formatDate } from '@/lib/utils'

export default function DayView() {
  const { date } = useParams()
  const queryDate = date || formatDateISO(getYesterday())

  const { loading, error, data } = useQuery(GET_PLAYLISTS_BY_DATE, {
    variables: { date: queryDate },
  })

  const displayDate = formatDate(new Date(queryDate + 'T12:00:00'))

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-6">
          Shows for {displayDate}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Failed to load playlists</p>
        <p className="text-sm text-text-muted mt-2">{error.message}</p>
      </div>
    )
  }

  const playlists = data?.playlistsByDate || []

  if (playlists.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-6">
          Shows for {displayDate}
        </h1>
        <div className="text-center py-12">
          <p className="text-text-secondary">No shows found for this date</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Shows for {displayDate}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {playlists.map((playlist: {
          id: string
          name: string
          slug: string
          date: string
          timeslot?: string
          imageUrl?: string
          dj?: { name: string }
        }) => (
          <ShowCard
            key={playlist.id}
            name={playlist.name}
            slug={playlist.slug}
            date={playlist.date}
            djName={playlist.dj?.name}
            timeslot={playlist.timeslot}
            imageUrl={playlist.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
