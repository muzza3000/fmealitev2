class CausesController < ApplicationController
  include CardContentHelper
  before_action :set_cause, only: [:update, :destroy]

  def update
    adjust_confirmed_params
    @cause.update(cause_params)
    @fmea = @cause.failure_mode.function.fmea
    if params["live"] == "true"
      redirect_to collaboration_fmea_path(@fmea)
      return
    end

    FmeaCollaborationChannel.broadcast_to(
    @fmea, update_card_broadcast(@cause).to_json)

    # redirect to the function where the cause was added
    redirect_to edit_fmea_path(@fmea, anchor: card_id(@cause.failure_mode.function))
  end

  def create
    @cause = Cause.new(cause_params)
    @fmea = @cause.failure_mode.function.fmea

    if @cause.save
      # Broadcast the creation to the collaboration channel
      FmeaCollaborationChannel.broadcast_to(
      @fmea, new_card_broadcast(@cause).to_json)

      # redirect to the function where the cause was added
      redirect_to edit_fmea_path(@cause.failure_mode.function.fmea, anchor: card_id(@cause.failure_mode.function))
    else
      # redirect to fmea and show errors as a flash alert
      flash[:alert] = @cause.errors.full_messages
      redirect_to edit_fmea_path(@cause.failure_mode.function.fmea, anchor: card_id(@cause.failure_mode.function))
    end
  end

  def destroy
    @failure_mode = @cause.failure_mode

    @fmea = @cause.failure_mode.function.fmea

    # form the json for the broadcase
    payload = destroy_card_broadcast(@cause).to_json

    # destroy the record
    @cause.destroy

    # broadcast the action
    FmeaCollaborationChannel.broadcast_to(
    @fmea, payload)

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
