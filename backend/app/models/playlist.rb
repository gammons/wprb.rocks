class Playlist < ApplicationRecord
  belongs_to :dj
  before_create :generate_slug
  has_many :songs, dependent: :delete_all

  def date
    created_at.strftime("%Y-%m-%d")
  end

  private

  def generate_slug
    self.slug = name.parameterize
  end
end
