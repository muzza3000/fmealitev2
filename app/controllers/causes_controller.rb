class CausesController < ApplicationController
  include CardContentHelper
  before_action :set_cause, only: [:update]

  def update
    adjust_confirmed_params
    @cause.update(cause_params)
    @fmea = @cause.failure_mode.function.fmea
    if params["live"] == "true"
      redirect_to collaboration_fmea_path(@fmea)
      return
    end
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

  def destroy
    @cause = Cause.find(params['id'])
    @failure_mode = @cause.failure_mode
    @cause.destroy
    redirect_to edit_fmea_path(@failure_mode.function.fmea, anchor: card_id(@failure_mode.function))
  end

  private

  def set_cause
    @cause = Cause.find(params[:id])
  end

  def cause_params
      params.require(:cause).permit(:description, :occurrence, :failure_mode, :failure_mode_id, :confirmed)
  end

  def adjust_confirmed_params
    if params["cause"]["confirmed"] == "0"
      params["cause"]["confirmed"] = false
    elsif params["cause"]["confirmed"] == "1"
      params["cause"]["confirmed"] = true
    end
  end
end
