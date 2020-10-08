class FunctionsController < ApplicationController
  before_action :set_function, only: [:update]

  def update
    @function.update(function_params)
    @fmea = @function.fmea
    redirect_to edit_fmea_path(@fmea)
  end

  private

  def set_function
    @function = Function.find(params[:id])
  end

  def function_params
    params.require(:function).permit(:description)
  end
end