class AddIndexes < ActiveRecord::Migration[5.0]
  def change
    add_index :stops, :street_id
  end
end
