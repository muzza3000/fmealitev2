class FailureModesController < ApplicationController
  include CardContentHelper
  before_action :set_failure_mode, only: [:update]

  def update
    @failure_mode.update(failure_mode_params)
    @fmea = @failure_mode.function.fmea
    # redirect to where the failure mode was added
    redirect_to edit_fmea_path(@fmea, anchor: card_id(@failure_mode.function))
  end

  def create
    @failure_mode = FailureMode.new(failure_mode_params)

    if @failure_mode.save
      # redirect to the function where the failure mode was added
      redirect_to edit_fmea_path(@failure_mode.function.fmea, anchor: card_id(@failure_mode.function))
    else
      # redirect to fmea and show errors as a flash alert
      flash[:alert] = @failure_mode.errors.full_messages
      redirect_to edit_fmea_path(@failure_mode.function.fmea, anchor: card_id(@failure_mode.function))
    end
  end

  def destroy
    @failure_mode = FailureMode.find(params['id'])
    @function = @failure_mode.function
    @failure_mode.destroy
    redirect_to edit_fmea_path(@function.fmea, anchor: card_id(@function))
  end

  private

  def set_failure_mode
    @failure_mode = FailureMode.find(params[:id])
  end

  def failure_mode_params
    params.require(:failure_mode).permit(:description, :function, :function_id)
  end
end