class FmeasController < ApplicationController
  before_action :set_fmea, only: (:edit)
  def index
    @fmeas = Fmea.all
    @fmea = Fmea.new
  end

  def create
    @fmea = Fmea.new(fmea_params)
    @fmea.risk_matrix_id = RiskMatrix.create(scale: 10).id
    @fmea.save
  end

  private

  def set_fmea
    @fmea = Fmea.find(params[:id])
  end

  def fmea_params
    params.require(:fmea).permit(:title, :risk_matrix, :description)
  end
end
