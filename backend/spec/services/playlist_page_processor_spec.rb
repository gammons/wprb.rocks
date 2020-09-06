require "rails_helper"

describe PlaylistPageProcessor do
  it "#process_html" do
    ret = PlaylistPageProcessor.new.process_html(File.read("spec/fixtures/playlist.html"))
    byebug
    sleep 0
  end
end
