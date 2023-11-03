class Video < ApplicationRecord
  belongs_to :user

  validates :title, :uid, :link, presence: true
end
