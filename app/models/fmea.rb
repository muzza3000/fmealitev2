class Fmea < ApplicationRecord
  belongs_to :risk_matrix
  has_many :activities
end
