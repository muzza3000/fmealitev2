class Effect < ApplicationRecord
  belongs_to :failure_mode

  def amount_of_children
    return 0
  end

  def id_of_parent
    self.failure_mode_id
  end
end
