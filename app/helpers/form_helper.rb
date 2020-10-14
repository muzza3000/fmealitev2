module FormHelper
  def risk_matrix_selection
    # we want to return an array like [['value', 'label'],['value', 'label']]
    output = []
    RiskMatrix.all.map do |risk_matrix|
      [risk_matrix.id, risk_matrix.name]
    end
  end
end