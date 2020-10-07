class Fmea < ApplicationRecord
  belongs_to :risk_matrix
  has_many :activities
  has_many :functions, dependent: :destroy
  has_many :failure_modes, through: :functions
  has_many :effects, through: :failure_modes
  has_many :causes, through: :failure_modes
  has_many :actions, through: :causes

  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :fmea_type, inclusion: { in: %w(Design System Process), message: "%{value} is not 'Design', 'System' or 'Process'" }
end
