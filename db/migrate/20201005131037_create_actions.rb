class CreateActions < ActiveRecord::Migration[6.0]
  def change
    create_table :actions do |t|
      t.text :description
      t.date :deadline
      t.string :status
      t.text :followup
      t.references :user, null: false, foreign_key: true
      t.references :cause, null: false, foreign_key: true

      t.timestamps
    end
  end
end
