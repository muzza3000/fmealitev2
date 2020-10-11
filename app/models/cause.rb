class Cause < ApplicationRecord
  belongs_to :failure_mode
  has_many :actions, dependent: :destroy
  validates :description, presence: true

  def parent
    self.failure_mode
  end

  # This method for the selection-highlighting in the edit_fmea-page
  def amount_of_children
    return 0
  end

  def id_of_parent
    self.failure_mode_id
  end
end
