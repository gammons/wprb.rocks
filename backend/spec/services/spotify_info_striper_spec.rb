require 'rails_helper'

describe SpotifyInfoStriper do
  let(:searcher) { instance_double(SpotifySearch::Searcher) }
  let(:song) { Song.new(artist_name: 'Ween', name: 'Sarah') }

  before do
    allow(SpotifySearch::Searcher).to receive(:new).and_return(searcher)
    allow_any_instance_of(Object).to receive(:sleep)
  end

  def track_data(images:)
    {
      'id' => 'track-id',
      'artists' => [{ 'id' => 'artist-id' }],
      'album' => { 'id' => 'album-id', 'images' => images }
    }
  end

  describe '#stripe' do
    it 'uses the medium (second) image when available' do
      allow(searcher).to receive(:track_search).and_return(
        track_data(images: [{ 'url' => 'large.jpg' }, { 'url' => 'medium.jpg' }])
      )

      result = SpotifyInfoStriper.new.stripe([song])

      expect(result.first.image_url).to eq('medium.jpg')
    end

    it 'falls back to the first image when the album has only one image' do
      allow(searcher).to receive(:track_search).and_return(
        track_data(images: [{ 'url' => 'only.jpg' }])
      )

      result = SpotifyInfoStriper.new.stripe([song])

      expect(result.first.image_url).to eq('only.jpg')
      expect(result.first.spotify_song_id).to eq('track-id')
    end

    it 'leaves image_url nil when the album has no images' do
      allow(searcher).to receive(:track_search).and_return(track_data(images: []))

      result = SpotifyInfoStriper.new.stripe([song])

      expect(result.first.image_url).to be_nil
      expect(result.first.spotify_song_id).to eq('track-id')
    end

    it 'skips songs not found in spotify' do
      allow(searcher).to receive(:track_search).and_return(nil)

      result = SpotifyInfoStriper.new.stripe([song])

      expect(result).to be_empty
    end
  end
end
