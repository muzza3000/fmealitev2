class FmeasController < ApplicationController
  before_action :set_fmea, only: (:edit)
  def index
    @fmeas = Fmea.all
  end

  private

  def set_fmea
    @fmea = Fmea.find(params[:id])
  end
end
