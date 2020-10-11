class Effect < ApplicationRecord
  belongs_to :failure_mode
  validates :description, presence: true

  def id_of_parent
    self.failure_mode_id

  def parent
    self.failure_mode
  end
end
