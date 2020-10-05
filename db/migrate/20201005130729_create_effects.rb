class CreateEffects < ActiveRecord::Migration[6.0]
  def change
    create_table :effects do |t|
      t.text :description
      t.integer :severity
      t.references :failure_mode, null: false, foreign_key: true

      t.timestamps
    end
  end
end
