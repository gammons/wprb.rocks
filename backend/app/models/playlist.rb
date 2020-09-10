class Playlist < ApplicationRecord
  belongs_to :dj
  has_many :songs, dependent: :delete_all

  def slug
    name.parameterize
  end

  def date
    created_at.strftime("%Y-%m-%d")
  end
end
