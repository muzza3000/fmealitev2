class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  before_create :set_color
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :actions
  validates :email, presence: true, uniqueness: { case_sensitive: false }

  private

  def set_color
    colors = ["#BC4343", "#E6C348", "#64BC7C", "#9DBBD7"]
    self.color = colors.sample if self.color.nil?
  end
end
