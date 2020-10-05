class AddNameToRiskMatrix < ActiveRecord::Migration[6.0]
  def change
    add_column :risk_matrices, :name, :string
  end
end
