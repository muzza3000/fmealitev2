class EffectsController < ApplicationController
  before_action :set_effect, only: [:update]

  def update
    @effect.update(effect_params)
    @fmea = @effect.failure_mode.function.fmea
    redirect_to edit_fmea_path(@fmea)
  end

  private

  def set_effect
    @effect = Effect.find(params[:id])
  end

  def effect_params
    params.require(:effect).permit(:description, :severity)
  end
end
