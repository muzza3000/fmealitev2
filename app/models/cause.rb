class Cause < ApplicationRecord
  belongs_to :failure_mode
  belongs_to :fmea, through: :failure_mode
  has_many :actions
end
