class Function < ApplicationRecord
  belongs_to :fmea
  has_many :failure_modes
end
