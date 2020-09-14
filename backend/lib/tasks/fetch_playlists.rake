namespace :wprb do
  desc "Fetches WPRB playlists"
  task fetch_playlists: :environment do
    PlaylistCreator.new.process
  end
  task retrieve_playlists: :environment do
    puts PlaylistCreator.new.retrieve
  end
end
