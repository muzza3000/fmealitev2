class EffectsController < ApplicationController
  include CardContentHelper
  before_action :set_effect, only: [:update, :destroy]

  def update
    adjust_confirmed_params
    @effect.update(effect_params)
    @fmea = @effect.failure_mode.function.fmea
    if params["live"] == "true"
      # redirect_to collaboration_fmea_path(@fmea)
      respond_to do |format|
        format.html { redirect_to collaboration_fmea_path(@fmea) }
        format.json { head :no_content }
      end
      return
    end

    FmeaCollaborationChannel.broadcast_to(
    @fmea, update_card_broadcast(@effect).to_json)

    # redirect to the function where the effect was added
    redirect_to edit_fmea_path(@fmea, anchor: card_id(@effect.failure_mode.function))
  end

  def create
    @effect = Effect.new(effect_params)
    @fmea = @effect.failure_mode.function.fmea

    if @effect.save
      # Broadcast the creation to the collaboration channel
      FmeaCollaborationChannel.broadcast_to(
      @fmea, new_card_broadcast(@effect).to_json)

      # redirect to the function where the effect was added
      redirect_to edit_fmea_path(@effect.failure_mode.function.fmea, anchor: card_id(@effect.failure_mode.function))
    else
      # redirect to fmea and show errors as a flash alert
      flash[:alert] = @effect.errors.full_messages
      redirect_to edit_fmea_path(@effect.failure_mode.function.fmea, anchor: card_id(@effect.failure_mode.function))
    end
  end

  def destroy
    @failure_mode = @effect.failure_mode
    @fmea = @effect.failure_mode.function.fmea

    # form the json for the broadcase
    payload = destroy_card_broadcast(@effect).to_json

    # destroy the record
    @effect.destroy

    # broadcast the action
    FmeaCollaborationChannel.broadcast_to(
    @fmea, payload)

    redirect_to edit_fmea_path(@failure_mode.function.fmea, anchor: card_id(@failure_mode.function))
  end

  private

  def set_effect
    @effect = Effect.find(params[:id])
  end

  def effect_params
    params.require(:effect).permit(:description, :severity, :failure_mode, :failure_mode_id, :confirmed)
  end

  def adjust_confirmed_params
    if params["effect"]["confirmed"] == "0"
      params["effect"]["confirmed"] = false
    elsif params["effect"]["confirmed"] == "1"
      params["effect"]["confirmed"] = true
    end
  end
end
