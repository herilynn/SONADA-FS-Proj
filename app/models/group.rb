# == Schema Information
#
# Table name: groups
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :text             not null
#  location    :string           not null
#  owner_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Group < ApplicationRecord
  validates  :name, :description, :location, presence: true

  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: :User

  has_many :memberships,
  foreign_key: :member_id,
  class_name: :Membership,
  dependent: :destroy

  has_many :members,
  through: :memberships,
  source: :member
end
