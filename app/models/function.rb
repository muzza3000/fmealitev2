class Function < ApplicationRecord
  belongs_to :fmea
  has_many :failure_modes, dependent: :destroy
  validates :description, presence: true

  def parent
    self.fmea
  end
end
