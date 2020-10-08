class FailureModesController < ApplicationController
  before_action :set_failure_mode, only: [:update]

  def update
    @failure_mode.update(failure_mode_params)
    @fmea = @failure_mode.function.fmea
    redirect_to edit_fmea_path(@fmea)
  end

  def create
    @failure_mode = FailureMode.create(failure_mode_params)
    @function = Function.find(params["failure_mode"]["function_id"]) # Why so complicated? Because this was passed with the simple form using the hidden-value. It does not return the object straight up.
    @failure_mode.function = @function
    @fmea = @function.fmea

    if @failure_mode.save
      redirect_to(edit_fmea_path(@fmea))
    else
      @fmeas = Fmea.all
      render action: :index
    end
  end

  private

  def set_failure_mode
    @failure_mode = FailureMode.find(params[:id])
  end

  def failure_mode_params
    params.require(:failure_mode).permit(:description, :function_id)
  end
end
