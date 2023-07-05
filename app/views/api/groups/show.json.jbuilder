# Incorrect
# json.group do 
#   json.extract! @group, :id, :name, :description, :location
# end

json.extract! @group, :id, :name, :description, :location, :owner_id, :latitude, :longitude
json.extract! @group.owner, :email