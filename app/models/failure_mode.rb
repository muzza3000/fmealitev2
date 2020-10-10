class FailureMode < ApplicationRecord
  belongs_to :function
  has_many :effects, dependent: :destroy
  has_many :causes, dependent: :destroy
  validates :description, presence: true

  def parent
    self.function
  end

  # This method for the selection-highlighting in the edit_fmea-page
  def amount_of_children
    all_causes = Cause.where("failure_mode_id = #{self.id}")
    return all_causes.count
  end
end
