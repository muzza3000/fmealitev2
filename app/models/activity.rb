class Activity < ApplicationRecord
  belongs_to :fmea
  validates :description, presence: true
end
