class FmeasController < ApplicationController
  def index
    @fmeas = Fmea.all
  end
end
