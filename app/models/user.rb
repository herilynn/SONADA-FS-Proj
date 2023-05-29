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
  validates :password, length: {minimum: 6}, allow nil: true 

  before_validation :ensure_session_token

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user&.authenticate(password) 
        return user
    else
        nil 
    end
end

  def reset_session_token!
      self.session_token = generate_unique_session_token
      save!
      session_token
  end

  private

  def generate_unique_session_token
      while true
          token = SecureRandom.urlsafe_base64
          return token unless User.exists?(session_token: token)
      end
  end

end
