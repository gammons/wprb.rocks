import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SpotifyLoginButton from '@/components/auth/SpotifyLoginButton'
import { formatDateISO, getYesterday } from '@/lib/utils'
import { addDays, parseISO, format } from 'date-fns'

export default function Header() {
  const navigate = useNavigate()
  const { date } = useParams()

  const currentDate = date ? parseISO(date) : getYesterday()

  const goToPreviousDay = () => {
    const prevDate = addDays(currentDate, -1)
    navigate(`/${formatDateISO(prevDate)}`)
  }

  const goToNextDay = () => {
    const nextDate = addDays(currentDate, 1)
    const yesterday = getYesterday()
    if (nextDate <= yesterday) {
      navigate(`/${formatDateISO(nextDate)}`)
    }
  }

  const isAtLatest = currentDate >= getYesterday()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-surface">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/wprb.png" alt="WPRB" className="h-8 w-auto" />
            <span className="hidden md:inline text-xl font-bold text-text-primary">
              WPRB.rocks
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousDay}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-text-secondary min-w-[100px] text-center">
            {format(currentDate, 'MMM d, yyyy')}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextDay}
            disabled={isAtLatest}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <SpotifyLoginButton />
      </div>
    </header>
  )
}
