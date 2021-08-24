def process_results(from_time)
  pc = PlaylistCreator.new
  striper = SpotifyInfoStriper.new

  results = pc.retrieve(from_time)
  results.each do |result|
    playlist = pc.playlist_from_result(result)
    next if playlist.nil?

    playlist.songs = striper.stripe(playlist.songs)
    playlist.save
  end
end

namespace :wprb do
  desc 'Fetches historical WPRB playlists'
  task process_historical_playlists: :environment do
    7.downto(1).each do |n|
      process_results(n.days.ago.strftime('%Y-%m-%d'))
    end
  end

  desc 'Fetches WPRB playlists'
  task process_playlists: :environment do
    process_results(0.day.ago.strftime('%Y-%m-%d'))
  end

  task retrieve_playlists: :environment do
    puts PlaylistCreator.new.retrieve(0.day.ago.strftime('%Y-%m-%d'))
  end

  task test: :environment do
    pl = OpenStruct.new(
      id: 13295705,
      title: "DoublePlusGood",
      dj_name: "Lizbot",
      url: "/WPRB/pl/13295705/DoublePlusGood",
      start: DateTime.parse("2021-05-20 17:00:00 -0400")
    )
    pc = PlaylistCreator.new
    pc.process([pl])
  end
end
