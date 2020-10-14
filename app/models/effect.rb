class Effect < ApplicationRecord
  belongs_to :failure_mode

  before_validation :set_confirmed

  def parent
    self.failure_mode
  end

  private

  def set_confirmed
    if self.confirmed.nil?
      self.confirmed = true
    end
  end
end
