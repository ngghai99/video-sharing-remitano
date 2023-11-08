class User < ApplicationRecord
  has_secure_password

  has_many :videos, dependent: :destroy

  before_validation :downcase_email
  validates :email, uniqueness: true, presence: true
  validates :password, presence: true
  validate :password_length

  def downcase_email
    self.email = email.downcase if email.present?
  end

  def password_length
    if password.present? && password.length < 6
      errors.add(:password, "must be at least 6 characters")
    end
  end
end
