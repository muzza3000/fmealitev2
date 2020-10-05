require 'csv'
require 'byebug'
def read_risk_matrix
  # Rails Path
  # files = File.join(Rails.root, 'db', 'seed_data', '/*.csv')
  # Road Vehicle - Risk Matrix

  files = File.expand_path("../../../db/seed_data/risk_matrices/*.csv", __FILE__)

  Dir.glob(files).each do |file|
    i = 0
    CSV.foreach(file) do |row|
      new_risk_matrix = RiskMatrix.new()
    end
  end
end


read_risk_matrix