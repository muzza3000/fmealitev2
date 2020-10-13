class AddConfirmedToCauses < ActiveRecord::Migration[6.0]
  def change
    add_column :causes, :confirmed, :boolean
  end
end
