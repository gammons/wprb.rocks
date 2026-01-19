# Runs daily, grabs the playlist urls from the previous day
class Result
  attr_accessor :id, :title, :dj_name, :url, :start

  def initialize(json)
    self.id = json['id']
    self.title = json['title']
    self.dj_name = json['text']
    self.url = json['url']
    self.start = Time.parse(json['start'])
  end

  def to_s
    "#{title} with #{dj_name}"
  end
end

class PlaylistCreator
  def retrieve(day = Time.now.strftime('%Y-%m-%d'))
    day = Time.parse(day)
    epoch = (Time.now.to_f * 1000).to_i
    time = CGI.escape(day.strftime('%Y-%m-%dT00:00:00'))
    end_time = CGI.escape((day + 24.hour).strftime('%Y-%m-%dT00:00:00'))

    url = "https://spinitron.com/WPRB/calendar-feed?timeslot=6&start=#{time}&end=#{end_time}&_=#{epoch}"

    resp = HTTP.get(url)

    results = JSON.parse(resp.body.to_s).map { |r| Result.new(r) }

    # spinitron has a bug where it sends results from a bunch of different dates, even though we only requested 1 date.
    results.select { |r| r.start > day.beginning_of_day && r.start < day.end_of_day }
  end

  # process an array of Result objects
  def playlist_from_result(result)
    return nil if Playlist.exists?(spinitron_id: result.id)

    dj = Dj.find_or_create_by(name: result.dj_name)
    return nil if dj.should_ignore?

    url = "https://spinitron.com#{result.url}"
    processed = PlaylistPageProcessor.new.process(url)
    songs = processed[:songs]
    image_url = processed[:image_url]
    return nil if songs.blank?

    songs.each { |s| s.dj = dj }

    playlist = Playlist.new(
      name: result.title,
      dj: dj,
      spinitron_id: result.id,
      created_at: result.start,
      image_url: image_url
    )
    playlist.songs = songs

    playlist
  end
end
