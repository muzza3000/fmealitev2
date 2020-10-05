class Effect < ApplicationRecord
  belongs_to :failure_mode
  belongs_to :fmea, through: :failure_mode
end
