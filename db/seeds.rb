require 'csv'

puts "--> Removing old data"
Action.destroy_all
User.destroy_all
Cause.destroy_all
Effect.destroy_all
FailureMode.destroy_all
Function.destroy_all
Fmea.destroy_all
RiskMatrix.destroy_all
puts "--> Successfully removed all old data"


def create_users
  file = File.join(Rails.root, 'db', 'seed_data','users', '/users.csv')
  i = 0
  CSV.foreach(file) do |row|
    User.create(first_name: row[0], last_name: row[1], email: row[2], password: row[3], color: row[4]) unless i == 0
    i += 1
  end
end


def read_risk_matrix
  # Rails path to directory containing csv files with risk matrix data
  files = File.join(Rails.root, 'db', 'seed_data','risk_matrices', '/*.csv')
  # files = File.expand_path("../../../db/seed_data/risk_matrices/*.csv", __FILE__)

  # iterate over all csv files
  Dir.glob(files).each do |file|
    risk_matrix = RiskMatrix.new
    i = -1
    CSV.foreach(file) do |row|
      # read name of risk matrix
      if i < 1
        risk_matrix.name = row[1] if i == -1
        i += 1
        next
      end
      # then populate the s1-10 / o1-10 values
      risk_matrix.send("s#{i}=", row[1])
      risk_matrix.send("o#{i}=", row[2])
      # reallocate the scale to the number populated
      risk_matrix.scale = i
      i += 1
    end
    risk_matrix.save
  end
end


def read_fmea
  # rails path to the directory containing the fmea csv files
  files = File.join(Rails.root, 'db', 'seed_data','fmeas', '/*.csv')

  Dir.glob(files).each do |file|
    fmea = Fmea.new
    i = 0
    CSV.foreach(file) do |row|
      # gather basic info from the csv file
      if i < 5
        fmea.title = row[1] if i == 0
        fmea.description = row[1] if i == 1
        fmea.fmea_type = row[1] if i == 2
        fmea.risk_matrix = RiskMatrix.find_by(name: row[1]) if i == 3
        i += 1
        next
      end

      # read the following from the csv files
      function = Function.create(description: row[1], fmea: fmea) if row[0] == "function"
      failure_mode = FailureMode.create(description: row[1], function: Function.last) if row[0] == "failure_mode"
      effect = Effect.create(description: row[1], severity: row[2], failure_mode: FailureMode.last) if row[0] == "effect"
      cause = Cause.create(description: row[1], occurrence: row[2], failure_mode: FailureMode.last) if row[0] == "cause"
      action = Action.create(description: row[1], deadline: Date::strptime(row[3], "%d/%m/%y"), status: row[4], followup: row[5], cause: Cause.last, user: User.first) if row[0] == "action"
    end
  end
end



create_users
puts "--> Created #{User.count} users"

read_risk_matrix
puts "--> Created #{RiskMatrix.count} risk matrices"

read_fmea
puts "--> Created #{Fmea.count} fmeas"
puts "--> Created #{Function.count} functions"
puts "--> Created #{FailureMode.count} failure modes"
puts "--> Created #{Effect.count} effects"
puts "--> Created #{Cause.count} causes"
puts "--> Created #{Action.count} actions"