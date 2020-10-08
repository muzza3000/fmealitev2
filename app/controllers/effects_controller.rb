class EffectsController < ApplicationController
  include CardContentHelper
  before_action :set_effect, only: [:update]

  def update
    @effect.update(effect_params)
    @fmea = @effect.failure_mode.function.fmea
    redirect_to edit_fmea_path(@fmea, anchor: card_id(@effect))
  end

  private

  def set_effect
    @effect = Effect.find(params[:id])
  end

  def effect_params
    params.require(:effect).permit(:description, :severity)
  end
end
