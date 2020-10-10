class CausesController < ApplicationController
  include CardContentHelper
  before_action :set_cause, only: [:update]

  def update
    @cause.update(cause_params)
    @fmea = @cause.failure_mode.function.fmea
    # redirect to the function where the cause was added
    redirect_to edit_fmea_path(@fmea, anchor: card_id(@cause.failure_mode.function))
  end

  def create
    @cause = Cause.new(cause_params)

    if @cause.save
      # redirect to the function where the cause was added
      redirect_to edit_fmea_path(@cause.failure_mode.function.fmea, anchor: card_id(@cause.failure_mode.function))
    else
      # redirect to fmea and show errors as a flash alert
      flash[:alert] = @cause.errors.full_messages
      redirect_to edit_fmea_path(@cause.failure_mode.function.fmea, anchor: card_id(@cause.failure_mode.function))
    end
  end

  private

  def set_cause
    @cause = Cause.find(params[:id])
  end

  def cause_params
    params.require(:cause).permit(:description, :occurrence, :failure_mode, :failure_mode_id)
  end
end