FactoryBot.define do
  factory :video do
    user { create(:user) }
    sequence(:title) { |n| "Video Title #{n}" }
    sequence(:uid) { |n| "amfWIRasxtI #{n}" }
    description { 'Video Description' }
    link { 'https://www.youtube.com/watch?v=amfWIRasxtI' }
    user_id { user.id }
    trait :invalid do
      link { '' }
      uid { ''}
      title { ''}
    end
  end
end
