json.groups do 
  @groups.each do |group|
    json.set! group.id do
      json.extract! group, :id, :name, :description, :location, :owner_id, :created_at, :updated_at
      # json.photoURL group.photo.url
    end
  end
end

if (@groups.empty?)
  json.groups({})
end