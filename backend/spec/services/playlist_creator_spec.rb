class PlaylistProcessorStub
  def process(_)
    [
      Song.new(album_name: 'one', artist_name: 'one', name: 'one'),
      Song.new(album_name: 'two', artist_name: 'two', name: 'two'),
      Song.new(album_name: 'three', artist_name: 'three', name: 'three')
    ]
  end
end

describe PlaylistCreator do
  let(:result) do
    info = { id: 123,
             title: 'DoublePlusGood',
             text: 'Lizbot',
             url: '/WPRB/pl/13929611/DoublePlusGood',
             start: '2021-05-08' }.with_indifferent_access
    Result.new(info)
  end

  it '#playlist_from_result' do
    allow(PlaylistPageProcessor).to receive(:new).and_return(PlaylistProcessorStub.new)

    playlist = PlaylistCreator.new.playlist_from_result(result)

    expect(playlist.name).to eq('DoublePlusGood')
    expect(playlist.songs.to_a.count).to eq(3)
    expect(playlist).to be_valid
  end
end
