class FmeasController < ApplicationController
  before_action :set_fmea, only: [:edit, :update]

  def index
    @query = params[:search][:query] if params[:search].present?

    if @query.present?
      sql_query = " \
      fmeas.title ILIKE :query \
      OR risk_matrices.name ILIKE :query \
      "
      @fmeas = Fmea.joins(:risk_matrix).where(sql_query, query: "%#{@query}%")
      # @fmeas = Fmea.where("title ILIKE ?", "%#{@query}%")
    else
      @fmeas = Fmea.all
    end

    @fmea = Fmea.new
  end

  def edit
  end

  def create
    @fmea = Fmea.new(fmea_params)
    @fmea.risk_matrix = RiskMatrix.first
    @fmea.fmea_type = "Design"
    if @fmea.save
      redirect_to(edit_fmea_path(@fmea))
    else
      @fmeas = Fmea.all
      render action: :index
    end
  end

  def update
    @fmea.update(fmea_params)
    redirect_to edit_fmea_path(@fmea)
  end

  def destroy
    @fmea = Fmea.find(params["id"])
    @fmea.destroy
    redirect_to(fmeas_path)
  end

  private

  def set_fmea
    @fmea = Fmea.find(params[:id])
  end

  def fmea_params
    params.require(:fmea).permit(:title, :risk_matrix, :description, images: [])
  end
end
