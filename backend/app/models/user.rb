class User < ApplicationRecord
  has_secure_password

  before_validation :downcase_email
  validates :email, uniqueness: true

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
