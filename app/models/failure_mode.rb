class FailureMode < ApplicationRecord
  belongs_to :function
  has_many :effects, dependent: :destroy
  has_many :causes, dependent: :destroy
  validates :description, presence: true

  def parent
    self.function
  end
end
