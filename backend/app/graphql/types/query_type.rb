module Types
  class QueryType < Types::BaseObject
    field :djs, [Types::DjType], null: false
    field :playlists, [Types::PlaylistType], null: false do
      description "Find playlists"
      argument :slug, String, required: false
    end

    field :playlist, Types::PlaylistType, null: true do
      description "Find a playlist by slug and date"
      argument :slug, String, required: true
      argument :date, String, required: true
    end

    field :playlists_by_date, [Types::PlaylistType], null: false do
      description "Find playlists by date"
      argument :date, String, required: true
    end

    def djs
      Dj.all
    end

    def playlists_by_date(date: nil)
      d = Date.parse(date)
      Playlist.where(created_at: d.beginning_of_day..d.end_of_day)
    end

    def playlists(slug: nil)
      if !slug.blank?
        Playlist.where(slug: slug).order(:created_at, :desc)
      else
        Playlist.order(:created_at, :desc)
      end
    end

    def playlist(slug:, date:)
      d = Date.parse(date)
      Playlist.find_by(created_at: d.beginning_of_day..d.end_of_day, slug: slug)
    end
  end
end
