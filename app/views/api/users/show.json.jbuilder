json.user do
  json.extract! @user, :id, :name, :email, :location, :created_at, :updated_at
end