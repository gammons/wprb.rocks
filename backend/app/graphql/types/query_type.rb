module Types
  class QueryType < Types::BaseObject
    field :djs, [Types::DjType], null: false
    field :playlists, [Types::PlaylistType], null: false

    def djs
      Dj.all
    end

    def playlists
      Playlist.order(:created_at, :desc)
    end
  end
end
