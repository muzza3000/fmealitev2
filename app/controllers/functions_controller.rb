class FunctionsController < ApplicationController
  include CardContentHelper
  before_action :set_function, only: [:update]

  def update
    @function.update(function_params)
    @fmea = @function.fmea
    redirect_to edit_fmea_path(@fmea, anchor: card_id(@function))
  end

  def create
    @function = Function.new(function_params)
    if @function.save
      redirect_to edit_fmea_path(@function.fmea, anchor: card_id(@function))
    else
      # redirect to fmea and show errors as a flash alert
      flash[:alert] = @function.errors.full_messages
      redirect_to edit_fmea_path(@function.fmea, anchor: card_id(@function))
    end
  end

  private

  def set_function
    @function = Function.find(params[:id])
  end

  def function_params
    params.require(:function).permit(:description, :fmea, :fmea_id)
  end
end
