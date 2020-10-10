class Cause < ApplicationRecord
  belongs_to :failure_mode
  has_many :actions, dependent: :destroy

  def parent
    self.failure_mode
  end

  # This method for the selection-highlighting in the edit_fmea-page
  def amount_of_children
    return 0
  end
end
