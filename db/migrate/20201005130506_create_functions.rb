class CreateFunctions < ActiveRecord::Migration[6.0]
  def change
    create_table :functions do |t|
      t.text :description
      t.references :fmea, null: false, foreign_key: true

      t.timestamps
    end
  end
end
