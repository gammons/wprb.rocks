import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Calendar } from 'lucide-react'

interface EpisodeCardProps {
  date: string
  slug: string
  timeslot?: string
}

export default function EpisodeCard({ date, slug, timeslot }: EpisodeCardProps) {
  const displayDate = formatDate(new Date(date + 'T12:00:00'))

  return (
    <Link to={`/${date}/show/${slug}`}>
      <Card className="group flex items-center gap-4 p-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-md bg-surface-hover flex items-center justify-center">
          <Calendar className="h-5 w-5 text-text-muted group-hover:text-primary transition-colors" />
        </div>
        <CardHeader className="p-0 flex-1">
          <CardTitle className="text-base">{displayDate}</CardTitle>
          {timeslot && (
            <CardDescription>{timeslot}</CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  )
}
