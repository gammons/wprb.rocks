require 'spotify_search/spotify_search'
describe SpotifySearch::Searcher do
  let(:spotify) { SpotifySearch::Searcher.new }

  it '#search' do
    results = spotify.search('Ween', 'Sarah')
  end
end
