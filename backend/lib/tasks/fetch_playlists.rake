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
    pc.process(pc.retrieve(1.day.ago.strftime("%Y-%m-%d")))
  end

  task retrieve_playlists: :environment do
    puts PlaylistCreator.new.retrieve
  end
end
