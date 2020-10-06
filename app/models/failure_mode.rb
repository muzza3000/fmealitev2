class FailureMode < ApplicationRecord
  belongs_to :function
  has_many :effects, dependent: :destroy
  has_many :causes, dependent: :destroy
end
