module Types
  class PlaylistType < Types::BaseObject
    field :id, ID, null: false
    field :dj_id, Integer, null: true
    field :spinitron_id, Integer, null: true
    field :name, String, null: true
    field :timeslot, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :songs, [Types::SongType], null: true
    field :dj, Types::DjType, null: true
    field :slug, String, null: false
    field :date, String, null: true
    field :image_url, String, null: true
  end
end
