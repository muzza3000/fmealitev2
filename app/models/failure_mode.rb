class FailureMode < ApplicationRecord
  belongs_to :function
  has_many :effects
  has_many :causes
end
