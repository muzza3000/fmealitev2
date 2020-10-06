require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


def read_risk_matrix
  # Rails path to directory containing csv files with risk matrix data
  files = File.join(Rails.root, 'db', 'seed_data','risk_matrices', '/*.csv')
  # files = File.expand_path("../../../db/seed_data/risk_matrices/*.csv", __FILE__)

  # iterate over all csv files
  Dir.glob(files).each do |file|
    new_risk_matrix = RiskMatrix.new
    i = -1
    CSV.foreach(file) do |row|
      # read name of risk matrix
      if i < 1
        new_risk_matrix.name = row[0] if i == -1
        i += 1
        next
      end
      # then populate the s1-10 / o1-10 values
      new_risk_matrix.send("s#{i}=", row[1])
      new_risk_matrix.send("o#{i}=", row[2])
      # reallocate the scale to the number populated
      new_risk_matrix.scale = i
      i += 1
    end
    new_risk_matrix.save
  end
end


# create new risk matrices from csv files
puts "---> Creating New Risk Matrices from CSV files"
read_risk_matrix

puts "---> Created #{RiskMatrix.all.length} new risk matrices"