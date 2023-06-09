# Incorrect
# json.group do 
#   json.extract! @group, :id, :name, :description, :location
# end

json.extract! @group, :id, :name, :description, :location, :owner_id
json.extract! @group.owner, :email, owner_name: @group.owner.name