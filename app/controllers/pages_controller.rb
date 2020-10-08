class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :playground, :new_user_registration  ]

  def home
  end

  def playground
  end
end
