namespace :wprb do
  desc "Fetches historical WPRB playlists"
  task process_historical_playlists: :environment do
    7.downto(1).each do |n|
      pc = PlaylistCreator.new
      results = pc.retrieve(n.days.ago.strftime("%Y-%m-%d"))
      pc.process(results)
    end
  end

  desc "Fetches WPRB playlists"
  task process_playlists: :environment do
    pc = PlaylistCreator.new
    pc.process(pc.retrieve(0.day.ago.strftime("%Y-%m-%d")))
  end

  task retrieve_playlists: :environment do
    puts PlaylistCreator.new.retrieve
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
