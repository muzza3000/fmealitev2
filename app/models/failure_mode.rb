class FailureMode < ApplicationRecord
  belongs_to :function
  belongs_to :fmea, through: :function
  has_many :effects
  has_many :causes
end
