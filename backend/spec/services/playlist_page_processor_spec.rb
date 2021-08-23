describe PlaylistPageProcessor do
  it '#process_html' do
    PlaylistPageProcessor.new.process_html(File.read('spec/fixtures/playlist.html'))
  end
end
