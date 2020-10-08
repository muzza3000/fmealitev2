class FailureModesController < ApplicationController
  before_action :set_failure_mode, only: [:update]

  def update
    @failure_mode.update(failure_mode_params)
    @fmea = @failure_mode.function.fmea
    redirect_to edit_fmea_path(@fmea)
  end

  private

  def set_failure_mode
    @failure_mode = FailureMode.find(params[:id])
  end

  def failure_mode_params
    params.require(:failure_mode).permit(:description)
  end
end
