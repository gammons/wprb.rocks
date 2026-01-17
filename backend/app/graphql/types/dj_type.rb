module Types
  class DjType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :playlists, [Types::PlaylistType], null: true
    field :songs, [Types::SongType], null: true
  end
end
