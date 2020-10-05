class CreateFailureModes < ActiveRecord::Migration[6.0]
  def change
    create_table :failure_modes do |t|
      t.text :description
      t.references :function, null: false, foreign_key: true

      t.timestamps
    end
  end
end
