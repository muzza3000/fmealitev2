class CreateRiskMatrices < ActiveRecord::Migration[6.0]
  def change
    create_table :risk_matrices do |t|
      t.string :s1
      t.string :s2
      t.string :s3
      t.string :s4
      t.string :s5
      t.string :s6
      t.string :s7
      t.string :s8
      t.string :s9
      t.string :s10
      t.string :o1
      t.string :o2
      t.string :o3
      t.string :o4
      t.string :o5
      t.string :o6
      t.string :o7
      t.string :o8
      t.string :o9
      t.string :o10
      t.integer :scale

      t.timestamps
    end
  end
end
