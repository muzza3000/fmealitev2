class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :playground, :new_user_registration, :blog, :contact]

  def home
  end

  def playground
  end

  def blog
  end

  def pages
  end
end
