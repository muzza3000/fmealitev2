class Fmea < ApplicationRecord
  belongs_to :risk_matrix
  has_many :activities, dependent: :destroy
  has_many :functions, dependent: :destroy
  has_many :failure_modes, through: :functions, dependent: :destroy
  has_many :effects, through: :failure_modes, dependent: :destroy
  has_many :causes, through: :failure_modes, dependent: :destroy
  has_many :actions, through: :causes, dependent: :destroy

  validates :title, presence: true, uniqueness: { case_sensitive: false }
end
