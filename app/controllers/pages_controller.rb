class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :playground, :new_user_registration, :blog  ]

  def home
  end

  def playground
  end

  def blog
  end
end
