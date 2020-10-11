class Function < ApplicationRecord
  belongs_to :fmea
  has_many :failure_modes, dependent: :destroy
  validates :description, presence: true

  def parent
    self.fmea
  end
  # This method for the selection-highlighting in the edit_fmea-page
  def amount_of_children
    children_count = 0
    all_fms = FailureMode.where("function_id = #{self.id}")
    children_count += all_fms.count
    all_fms.each do |fm|
      all_causes = Cause.where("failure_mode_id = #{fm.id}")
      children_count += all_causes.count
    end
    return children_count
  end
end
