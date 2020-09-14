# Runs daily, grabs the playlist urls from the previous day
class PlaylistCreator
  def retrieve
    epoch = (Time.now.to_f * 1000).to_i
    time = CGI.escape(Time.now.strftime("%Y-%m-%dT00:00:00"))

    url = "https://spinitron.com/WPRB/calendar-feed?timeslot=6&start=#{time}&end=#{time}&_=#{epoch}"

    resp = HTTP.get(url)
    JSON.parse(resp.body.to_s)
  end

  def process
    spotify = Spotify.new

    retrieve.each do |pl|
      next if Playlist.exists?(spinitron_id: pl["id"])

      puts "Processing #{pl['title']}"

      dj = Dj.find_or_create_by(name: pl["text"])

      next if dj.should_ignore?

      playlist = Playlist.create(
        name: pl["title"],
        dj: dj,
        spinitron_id: pl["id"]
      )

      url = "https://spinitron.com#{pl['url']}"
      spins = PlaylistPageProcessor.new.process(url)

      spins.each do |spin|
        spotify_data = spotify.search(spin[:artist], spin[:song])

        if spotify_data.nil?
          Rails.logger.info("Skipping artist '#{spin[:artist]}' and song '#{spin[:song]}', could not find in spotify")
          next
        end

        artist_id = spotify_data["artists"][0]["id"]
        album_id = spotify_data["album"]["id"]
        song_id = spotify_data["id"]
        image_url = spotify_data["album"]["images"][1]["url"]

        Song.create(
          dj: dj,
          playlist: playlist,
          album_name: spin[:album],
          name: spin[:song],
          artist_name: spin[:artist],
          spotify_album_id: album_id,
          spotify_artist_id: artist_id,
          spotify_song_id: song_id,
          image_url: image_url
        )

        sleep 0.5 # be kind to spotify
      end
    end
  end
end
