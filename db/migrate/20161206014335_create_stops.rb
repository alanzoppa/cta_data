class CreateStops < ActiveRecord::Migration[5.0]
  def change

    create_table :stops do |t|
      t.float :boardings
      t.float :alightings
      t.date :month_beginning 
      t.decimal :latitude
      t.decimal :longitude 
      t.integer :street_id
      t.string :cross_street
    end

    create_table :streets do |t|
      t.string :street_name
    end

    create_table :routes do |t|
      t.string :route_name
    end


    create_join_table :stops, :routes do |t|
      t.index :route_id
      t.index :stop_id
    end

    add_foreign_key :stops, :streets

    add_index :stops, :latitude
    add_index :stops, :longitude


  end
end
