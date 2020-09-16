# Runs daily, grabs the playlist urls from the previous day
class Result
  attr_accessor :id, :title, :dj_name, :url, :start

  def initialize(json)
    self.id = json["id"]
    self.title = json["title"]
    self.dj_name = json["text"]
    self.url = json["url"]
    self.start = Time.parse(json["start"])
  end

  def to_s
    "#{title} with #{dj_name}"
  end
end

class PlaylistCreator
  def retrieve(day = Time.now.strftime("%Y-%m-%d"))
    day = Time.parse(day)
    epoch = (Time.now.to_f * 1000).to_i
    time = CGI.escape(day.strftime("%Y-%m-%dT00:00:00"))
    end_time = CGI.escape((day + 24.hour).strftime("%Y-%m-%dT00:00:00"))

    url = "https://spinitron.com/WPRB/calendar-feed?timeslot=6&start=#{time}&end=#{end_time}&_=#{epoch}"

    resp = HTTP.get(url)

    results = JSON.parse(resp.body.to_s).map { |r| Result.new(r) }

    # spinitron has a bug where it sends results from a bunch of different dates, even though we only requested 1 date.
    results.select { |r| r.start > day.beginning_of_day && r.start < day.end_of_day }
  end

  # process an array of Result objects
  def process(results)
    spotify = Spotify.new

    results.each do |pl|
      next if Playlist.exists?(spinitron_id: pl.id)

      puts "Processing #{pl}"

      dj = Dj.find_or_create_by(name: pl.dj_name)

      next if dj.should_ignore?

      url = "https://spinitron.com#{pl.url}"
      spins = PlaylistPageProcessor.new.process(url)

      next if spins.blank?

      playlist = Playlist.create(
        name: pl.title,
        dj: dj,
        spinitron_id: pl.id,
        created_at: pl.start
      )

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
