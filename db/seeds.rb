# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do
  User.destroy_all
  ApplicationRecord.connection.reset_pk_sequence!("users")

  Group.destroy_all
  ApplicationRecord.connection.reset_pk_sequence!("groups")

  Membership.destroy_all
  ApplicationRecord.connection.reset_pk_sequence!("memberships")

User.create!(
  name: 'John Smith',
  email: 'demo@gmail.com',
  password: 'password',
  location: 'New York, NY'
  # latitude: '40.7128',
  # longitude: '74.0060'
)

User.create!(
  name: 'Alvin Zablan',
  email: 'Alvin_Zablan@gmail.com',
  password: 'password',
  location: 'New York, NY'
  # latitude: '40.7128',
  # longitude: '74.0060'
)

User.create!(
  name: "Not Spencer",
  email: "Spencer_Iascone@gmail.com",
  password: 'password',
  location: 'Austin, TX'
  # latitude: '30.2672',
  # longitude: '97.7431'
)

User.create!(
  name: "Ayce Lacap",
  email: "Ayce_Lacap@gmail.com",
  password: "password",
  location: "San Francisco, CA"
  # latitude: '37.7749',
  # longitude: '122.4194'
)

User.create!(
  name: "Kyle Ginzburg",
  email: "Kyle_Ginzburg@gmail.com",
  password: "password",
  location: "Boston, MA"
  # latitude: '42.3601',
  # longitude: '71.0589'
)

User.create!(
  name: "Kin Ka Tse",
  email: "Kin_Ka_Tse@gmail.com",
  password: "password",
  location: "Toronto, ON"
  # latitude: '43.6532',
  # longitude: '79.3832'
)

Group.create!(
  name: 'Meatbags',
  description: 'AI is a plaque; 1st they take our jobs. Tomorrow 
  your kids. Join up so we at least have a union when they take over.',
  location: "Boston, MA",
  latitude: 42.3601,
  longitude: 71.0589,
  owner_id: 5
)


Group.create!(
  name: 'Catching Zs',
  description: 'Bed/floor/car/roof/anywhere you can imagine.',
  location: 'New York, NY',
  latitude: 40.7128,
  longitude: 74.0060,
  owner_id: 2
)

Group.create!(
  name: 'AI Takeover',
  description: 'No more 404 error.',
  location: 'Austin, TX',
  latitude: 30.2672,
  longitude: 97.7431,
  owner_id: 3
)

# Group.create!(
#   name: ''
# )
# puts "done"
end
# Group.create! (
#   name:
#   description:
#   location:
#   owner_id:
# )

puts "done"