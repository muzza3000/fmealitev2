class AddConfirmedToEffects < ActiveRecord::Migration[6.0]
  def change
    add_column :effects, :confirmed, :boolean
  end
end
