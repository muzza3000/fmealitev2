class FmeasController < ApplicationController
  before_action :set_fmea, only: (:edit)
  def index
    @fmeas = Fmea.all
    @fmea = Fmea.new
  end

  def create
    Fmea.create(fmea_params)
  end

  private

  def set_fmea
    @fmea = Fmea.find(params[:id])
  end

  def fmea_params
    params.require(:fmea).permit(:title, :risk_matrix, :description)
  end
end
