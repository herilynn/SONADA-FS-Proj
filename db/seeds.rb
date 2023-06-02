# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do

User.create!(
  name: 'John Smith',
  email: 'demo@gmail.com',
  password: 'password',
  location: 'New York, NY'
)

User.create!(
  name: 'Alvin Zablan',
  email: 'forgothisemail@gmail.com',
  password: 'password',
  location: 'Queens, NY'
)

User.create!(
  name: "Not Spencer",
  email: "SpencerAI@gmail.com",
  password: 'password',
  location: 'Austin, TX'
)

Group.create!(
  name: 'Meatbags',
  description: 'AI is a plaque; 1st they take our jobs. Tomorrow 
  your kids. Join up so we at least have a union when they take over.',
  location: 'New York, NY',
  owner_id: 1
)


Group.create!(
  name: 'Catching Zs',
  description: 'Bed/floor/car/roof/anywhere you can imagine.',
  location: 'New York, NY',
  owner_id: 2
)

Group.create!(
  name: 'AI Takeover',
  description: 'No more 404 error.',
  location: 'South Pole, AQ',
  owner_id: 3
)
# puts "done"
end
# Group.create! (
#   name:
#   description:
#   location:
#   owner_id:
# )