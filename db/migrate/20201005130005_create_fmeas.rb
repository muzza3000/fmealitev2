class CreateFmeas < ActiveRecord::Migration[6.0]
  def change
    create_table :fmeas do |t|
      t.string :title
      t.text :description
      t.string :fmea_type
      t.references :risk_matrix, null: false, foreign_key: true

      t.timestamps
    end
  end
end
