# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  location        :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :name, :email, :password_digest, :location, :session_token, presence: true
   
  validates :session_token, :email, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: {minimum: 6}, allow_nil: true 

  before_validation :ensure_session_token

  has_secure_password

  has_many :groups,
  foreign_key: :owner_id,
  class_name: :Group

  has_many :memberships,
  foreign_key: :member_id,
  class_name: :Membership,
  dependent: :destroy

  has_many :joined_groups,
  through: :memberships,
  source: :group

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user&.authenticate(password) 
        return user
    else
        nil 
    end
end

  def reset_session_token!
      self.session_token = generate_unique_session_token
      self.save!
      self.session_token
  end

  private

  def generate_unique_session_token
      while true
          token = SecureRandom.urlsafe_base64
          return token unless User.exists?(session_token: token)
      end
  end

end
