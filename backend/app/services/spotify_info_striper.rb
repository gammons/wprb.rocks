class SpotifyInfoStriper
  def initialize
    @spotify = SpotifySearch::Searcher.new
  end

  # given an array of song models, populate the spotify info into them.
  def stripe(songs)
    songs.each do |song|
      spotify_data = @spotify.search(song.artist_name, song.name)

      sleep 0.2 # be kind to spotify

      if spotify_data.nil?
        Rails.logger.info("Skipping artist '#{song.artist_name}' and song '#{song.name}', could not find in spotify")
        next
      end

      song.spotify_artist_id = spotify_data['artists'][0]['id']
      song.spotify_album_id = spotify_data['album']['id']
      song.spotify_song_id = spotify_data['id']
    end

    songs.reject { |s| s.spotify_song_id.nil? }
  end
end
