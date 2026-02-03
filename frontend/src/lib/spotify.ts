const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'dfe2abbeeee64a4193aeac98702a59d7'
const API_URL = import.meta.env.VITE_API_URL || 'https://api.wprb.rocks'

const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-modify-private',
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

export async function createSpotifyPlaylist(
  accessToken: string,
  name: string,
  description: string,
  trackUris: string[]
): Promise<{ playlistUrl: string }> {
  // Get user ID first
  const userResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!userResponse.ok) {
    throw new Error('Failed to get user info')
  }
  const user = await userResponse.json()

  // Create playlist
  const createResponse = await fetch(
    `https://api.spotify.com/v1/users/${user.id}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        public: false,
      }),
    }
  )
  if (!createResponse.ok) {
    throw new Error('Failed to create playlist')
  }
  const playlist = await createResponse.json()

  // Add tracks (Spotify allows max 100 at a time)
  const validUris = trackUris.filter((uri) => uri)
  for (let i = 0; i < validUris.length; i += 100) {
    const batch = validUris.slice(i, i + 100)
    const addResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: batch }),
      }
    )
    if (!addResponse.ok) {
      throw new Error('Failed to add tracks to playlist')
    }
  }

  return { playlistUrl: playlist.external_urls.spotify }
}
