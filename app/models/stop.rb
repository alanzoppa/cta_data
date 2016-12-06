class Stop < ApplicationRecord
  has_one :street
  has_and_belongs_to_many :routes
end
