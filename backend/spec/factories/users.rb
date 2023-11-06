FactoryBot.define do
  factory :user, class: User do

    sequence(:email) { |n| "ngghai#{n}@gmail.com" }
    password { '123456'}

    trait :invalid do
      email { '' }
      password { ''}
    end
  end
end
