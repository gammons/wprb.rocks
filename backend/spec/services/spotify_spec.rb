describe Spotify do
  let(:spotify) { Spotify.new }

  it '#search' do
    results = spotify.search('Ween', 'Sarah')
    byebug
    sleep 0
  end
end
