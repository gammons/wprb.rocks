import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

export function useTokenManager() {
  const { accessToken, isAuthenticated } = useAuth()

  useEffect(() => {
    // Token management is now handled by AuthContext
    // This hook exists for backward compatibility
  }, [accessToken])

  return {
    token: accessToken,
    isValid: isAuthenticated,
  }
}
