class CreatePlaylists < ActiveRecord::Migration[6.0]
  def change
    create_table :playlists do |t|
      t.integer :dj_id
      t.integer :spinitron_id

      t.string :name
      t.string :timeslot

      t.index :spinitron_id
      t.index :dj_id
      t.timestamps
    end
  end
end
