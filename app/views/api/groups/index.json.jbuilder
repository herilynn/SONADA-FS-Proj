@groups.each do |group|
  json.set! group.id do 
    json.extract! group, :id, :name, :description, :location, :owner_id, :latitude, :longitude
  end
end
