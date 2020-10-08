class FunctionsController < ApplicationController
  include CardContentHelper
  before_action :set_function, only: [:update]

  def update
    @function.update(function_params)
    @fmea = @function.fmea
    redirect_to edit_fmea_path(@fmea, anchor: card_id(@function))
  end

  private

  def set_function
    @function = Function.find(params[:id])
  end

  def function_params
    params.require(:function).permit(:description)
  end
end