class CreateCauses < ActiveRecord::Migration[6.0]
  def change
    create_table :causes do |t|
      t.text :description
      t.integer :occurrence
      t.references :failure_mode, null: false, foreign_key: true

      t.timestamps
    end
  end
end
