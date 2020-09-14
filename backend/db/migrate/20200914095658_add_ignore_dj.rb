class AddIgnoreDj < ActiveRecord::Migration[6.0]
  def change
    add_column :djs, :should_ignore, :boolean, default: false
  end
end
