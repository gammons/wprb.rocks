import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Music } from 'lucide-react'

interface ShowCardProps {
  name: string
  slug: string
  date: string
  djName?: string
  timeslot?: string
  imageUrl?: string
}

export default function ShowCard({ name, slug, date, djName, timeslot, imageUrl }: ShowCardProps) {
  return (
    <Link to={`/${date}/show/${slug}`}>
      <Card className="group h-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="aspect-square rounded-md mb-4 object-cover w-full"
          />
        ) : (
          <div className="aspect-square bg-gradient-to-br from-surface-hover to-background rounded-md mb-4 flex items-center justify-center">
            <Music className="h-16 w-16 text-text-muted group-hover:text-primary transition-colors" />
          </div>
        )}
        <CardHeader className="p-0">
          <CardTitle className="text-base line-clamp-2">{name}</CardTitle>
          <CardDescription>
            {djName && <span>{djName}</span>}
            {timeslot && <span className="block text-xs">{timeslot}</span>}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
