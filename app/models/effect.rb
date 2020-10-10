class Effect < ApplicationRecord
  belongs_to :failure_mode

  def parent
    self.failure_mode
  end
end
