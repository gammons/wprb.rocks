require 'net/http'

class SpotifyController < ApplicationController
  # this is called after the spotify redirect.
  # we get a request code, we must exchange for access token
  def authorize
    args = {
      grant_type: 'authorization_code',
      code: params[:code],
      redirect_uri: (api_uri + '/spotify/authorize')
    }

    json = call_spotify(args)
    redirect_to "#{frontend_uri}?#{json.to_query}", allow_other_host: true
  end

  def refresh
    args = {
      grant_type: 'refresh_token',
      refresh_token: params[:token],
      redirect_uri: (api_uri + '/spotify/authorize')
    }

    render json: call_spotify(args)
  end

  private

  def call_spotify(args)
    spotify_url = 'https://accounts.spotify.com/api/token?' + args.to_query
    spotify_uri = URI.parse(spotify_url)
    auth = Base64.strict_encode64("#{ENV['SPOTIFY_CLIENT_ID']}:#{ENV['SPOTIFY_CLIENT_SECRET']}")

    req = Net::HTTP::Post.new(spotify_uri)
    req['Authorization'] = "Basic #{auth}"
    req['Content-Type'] = 'application/x-www-form-urlencoded'

    http = Net::HTTP.new(spotify_uri.hostname, spotify_uri.port)
    http.use_ssl = true
    resp = http.request(req)

    JSON.parse(resp.body)
  end

  def api_uri
    Rails.env.development? ? 'http://localhost:3000' : 'https://api.wprb.rocks'
  end

  def frontend_uri
    Rails.env.development? ? 'http://localhost:5173' : 'https://wprb.rocks'
  end
end
