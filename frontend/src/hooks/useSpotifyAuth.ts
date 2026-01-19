import { useAuth } from '@/context/AuthContext'

export function useSpotifyAuth() {
  const { accessToken, isAuthenticated, login, logout } = useAuth()

  return {
    token: accessToken,
    isAuthenticated,
    login,
    logout,
  }
}
