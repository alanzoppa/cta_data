require 'csv'

task import_csvs_in_cta_fixtures_dir: [:environment] do
  input_path = File.join(Rails.root, 'cta_fixtures')
  filenames = Dir.entries(input_path).select {|f| f =~ /\.csv$/}
  filenames.map! {|f| File.join(input_path, f) }

  filenames.each do |filename|
    matrix = CSV.read(filename)
    headers = matrix[0]
    headers.freeze
    data_rows = matrix[1..-1]
    data_rows_length = data_rows.length

    data = data_rows.each_with_index do |row, i|
      row = HashWithIndifferentAccess.new(headers.zip(row).to_h)
      street = Street.find_or_create_by(street_name: row[:on_street])
      coords_string = row[:location].gsub(/[)( ]*/, '')
      latitude, longitude = coords_string.split(',').map(&:to_f) unless coords_string.nil?
      
      stop = Stop.create(
        boardings: row[:boardings],
        alightings: row[:alightings],
        month_beginning: Date.parse(row[:month_beginning]),
        location: Stop.factory.point(latitude, longitude),
        street_id: street.id,
      )

      routes = row[:routes]&.split(',') || []

      stop.routes << routes.map {|route_name|
        Route.find_or_create_by(route_name: route_name)
      }

      puts "#{i}/#{data_rows_length} imported"
    end
  end
end
