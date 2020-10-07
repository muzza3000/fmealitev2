class CausesController < ApplicationController
  before_action :set_cause, only: [:update]

  def update
    @cause.update(cause_params)
    @fmea = @cause.failure_mode.function.fmea
    redirect_to edit_fmea_path(@fmea)
  end

  private

  def set_cause
    @cause = Cause.find(params[:id])
  end

  def cause_params
    params.require(:cause).permit(:description, :occurrence)
  end
end