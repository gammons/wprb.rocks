class AddSlugToPlaylists < ActiveRecord::Migration[6.0]
  def change
    add_column :playlists, :slug, :string
    add_index :playlists, %i[slug created_at]

    Playlist.find_each do |pl|
      pl.slug = pl.name.parameterize
      pl.save(touch: false)
    end
  end
end
