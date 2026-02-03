import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { refreshAccessToken } from '@/lib/spotify'

interface AuthContextType {
  accessToken: string | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const stored = localStorage.getItem('accessToken')
    return stored && stored !== 'undefined' ? stored : null
  })

  const getTokenExpiry = useCallback(() => {
    const expires = localStorage.getItem('tokenExpires')
    return expires ? parseInt(expires) : null
  }, [])

  const isTokenExpired = useCallback(() => {
    const expires = getTokenExpiry()
    return expires !== null && expires < Date.now()
  }, [getTokenExpiry])

  const refreshToken = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (!storedRefreshToken) return

    try {
      const data = await refreshAccessToken(storedRefreshToken)
      setAccessToken(data.access_token)
      localStorage.setItem('accessToken', data.access_token)

      const expiry = Date.now() + 1000 * 60 * 55 // 55 minutes
      localStorage.setItem('tokenExpires', expiry.toString())

      if (data.refresh_token) {
        localStorage.setItem('refreshToken', data.refresh_token)
      }
    } catch {
      logout()
    }
  }, [])

  // Handle OAuth callback tokens from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('access_token')
    const refresh = params.get('refresh_token')

    if (token) {
      setAccessToken(token)
      localStorage.setItem('accessToken', token)

      const expiry = Date.now() + 1000 * 60 * 55
      localStorage.setItem('tokenExpires', expiry.toString())

      if (refresh) {
        localStorage.setItem('refreshToken', refresh)
      }

      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // Token refresh interval
  useEffect(() => {
    if (!accessToken) return

    const checkAndRefresh = () => {
      if (isTokenExpired()) {
        refreshToken()
      }
    }

    // Check immediately
    checkAndRefresh()

    // Check every minute
    const interval = setInterval(checkAndRefresh, 60000)
    return () => clearInterval(interval)
  }, [accessToken, isTokenExpired, refreshToken])

  const login = () => {
    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'dfe2abbeeee64a4193aeac98702a59d7'
    const API_URL = import.meta.env.VITE_API_URL || 'https://api.wprb.rocks'

    const scopes = [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'playlist-modify-private',
    ].join(' ')

    const redirectUri = `${API_URL}/spotify/authorize`
    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes,
    })

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
  }

  const logout = () => {
    setAccessToken(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokenExpires')
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken && !isTokenExpired(),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
