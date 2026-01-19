import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { LogIn, LogOut } from 'lucide-react'

export default function SpotifyLoginButton() {
  const { isAuthenticated, login, logout } = useAuth()

  if (isAuthenticated) {
    return (
      <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
        <LogOut className="h-4 w-4" />
        <span className="hidden md:inline">Logout</span>
      </Button>
    )
  }

  return (
    <Button variant="default" size="sm" onClick={login} className="gap-2">
      <LogIn className="h-4 w-4" />
      <span className="hidden md:inline">Login with Spotify</span>
    </Button>
  )
}
