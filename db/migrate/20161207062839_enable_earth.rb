class EnableEarth < ActiveRecord::Migration[5.0]
  def up
    execute "CREATE EXTENSION cube;"
    execute "CREATE EXTENSION earthdistance;"
  end
  def down
    execute "DROP EXTENSION cube;"
    execute "DROP EXTENSION earthdistance;"
  end
end
