class Action < ApplicationRecord
  belongs_to :user
  belongs_to :cause

  validates :status, inclusion: { in: ["pending", "in progress", "completed" "cancelled"],
    message: "%{value} is not a valid status, must be 'pending', 'in progress', 'completed' or 'cancelled'" }
end
