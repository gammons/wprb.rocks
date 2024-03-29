const TokenManager = {
  getAccessToken: (): string => {
    if (window.localStorage.getItem("accessToken") === "undefined") return null

    return window.localStorage.getItem("accessToken")
  },

  hasAccessToken: () => {
    return (
      TokenManager.getAccessToken() !== null &&
      !TokenManager.isAccessTokenExpired()
    )
  },

  setAccessToken: (token: string) => {
    window.localStorage.setItem("accessToken", token)

    const expiry = Date.now() + 1000 * 60 * 60
    window.localStorage.setItem("tokenExpires", expiry.toString())
  },

  getRefreshToken: () => {
    return window.localStorage.getItem("refreshToken")
  },

  setRefreshToken: (token: string) => {
    window.localStorage.setItem("refreshToken", token)
  },

  refreshToken() {
    if (!TokenManager.hasAccessToken()) {
      return
    }

    if (TokenManager.isAccessTokenExpired()) {
      TokenManager.refreshAccessToken()
    }
  },

  getTokenExpires: () => {
    const expires = window.localStorage.getItem("tokenExpires")
    if (expires) return parseInt(expires)
    return null
  },

  isAccessTokenExpired: () => {
    const expires = TokenManager.getTokenExpires()
    return expires && expires < Date.now()
  },

  refreshAccessToken: async () => {
    const refreshed = await TokenManager.tokenRefresh()
    TokenManager.setAccessToken(refreshed.access_token)

    if (refreshed.refresh_token) {
      TokenManager.setRefreshToken(refreshed.refresh_token)
    }
  },

  tokenRefresh: async () => {
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://api.wprb.rocks"

    const resp = await fetch(
      `/${redirectUrl}/functions/spotifyRefresh?refresh_token=${TokenManager.getRefreshToken()}`,
      {
        method: "GET",
      }
    )

    const json = await resp.json()

    return json
  },

  clearTokens: () => {
    window.localStorage.removeItem("refreshToken")
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("tokenExpires")
  },
}

export default TokenManager
