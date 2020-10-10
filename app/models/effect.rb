class Effect < ApplicationRecord
  belongs_to :failure_mode
  validates :description, presence: true

  def parent
    self.failure_mode
  end
end
