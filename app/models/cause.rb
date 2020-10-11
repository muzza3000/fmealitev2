class Cause < ApplicationRecord
  belongs_to :failure_mode
  has_many :actions, dependent: :destroy
  validates :description, presence: true

  def parent
    self.failure_mode
  end
end
