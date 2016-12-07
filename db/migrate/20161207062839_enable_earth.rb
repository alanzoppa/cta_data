class EnableEarth < ActiveRecord::Migration[5.0]
  def up
    execute "CREATE EXTENSION earthdistance CASCADE;"
  end
  def down
    execute "DROP EXTENSION earthdistance CASCADE;"
  end
end
