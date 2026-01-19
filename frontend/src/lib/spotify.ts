const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'dfe2abbeeee64a4193aeac98702a59d7'
const API_URL = import.meta.env.VITE_API_URL || 'https://api.wprb.rocks'

const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
].join(' ')

export function getSpotifyAuthUrl(): string {
  const redirectUri = `${API_URL}/spotify/authorize`
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: SCOPES,
  })
  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string
  refresh_token?: string
}> {
  const response = await fetch(`${API_URL}/spotify/refresh?token=${refreshToken}`)
  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }
  return response.json()
}
