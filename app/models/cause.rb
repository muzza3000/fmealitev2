class Cause < ApplicationRecord
  belongs_to :failure_mode
  has_many :actions, dependent: :destroy
end
