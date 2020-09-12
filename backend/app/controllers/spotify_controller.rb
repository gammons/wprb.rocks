require "net/http"

class SpotifyController < ApplicationController
  # this is called after the spotify redirect.
  # we get a request code, we must exchange for access token
  def authorize
    return_uri = Rails.env.development? ? "http://localhost:3000" : "https://api.wprb.rocks"

    args = {
      grant_type: "authorization_code",
      code: params[:code],
      redirect_uri: (return_uri + "/spotify/authorize")
    }

    spotify_url = "https://accounts.spotify.com/api/token?" + args.to_query
    spotify_uri = URI.parse(spotify_url)
    auth = Base64.strict_encode64("#{ENV['SPOTIFY_CLIENT_ID']}:#{ENV['SPOTIFY_CLIENT_SECRET']}")

    req = Net::HTTP::Post.new(spotify_uri)
    req["Authorization"] = "Basic #{auth}"
    req["Content-Type"] = "application/x-www-form-urlencoded"

    http = Net::HTTP.new(spotify_uri.hostname, spotify_uri.port)
    http.use_ssl = true
    resp = http.request(req)

    json = JSON.parse(resp.body)
    return_uri = Rails.env.development? ? "http://localhost:3001" : "https://wprb.rocks"

    redirect_to "#{return_uri}?#{json.to_query}"
  end

  def refresh; end
end
