# Youtube Video Sharing App

## Introduction
- The Application for share link Youtube
- Show List Video.
- Login/Register.
- Real-time Notification when use share a movie.
- Can view video on list vdeo.

## Prerequisites
- Backend:

  |       Rails       |      Ruby        | Postgres     |YouTube Data API |
  | :------------:|:-------------:|:-----:|:-----:|
  |    7.0.8          |        3.2.2p53       |  13    | V3|

 - Frontend:

   |       ReactJS       |      NextJS        | Node     |Bootstrap |
   | :------------:|:-------------:|:-----:|:-----:|
   |    18.2.0          |        13.3.4       |  v21.1.0    | 5.3.2|

## Installation & Configuration

1. Step 1: Install Docker
2. Clone Repository:
3. Create .env file:

  ```sh
  RAILS_ENV=development
  DATABASE_USERNAME=postgres
  DATABASE_PASSWORD=postgres
  DATABASE_HOST=db
  DATABASE_NAME=app_dev
  YOUTUBE_API_KEY=<--->
  JWT_SECRET=<--->
  ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJleHAiOjE3MDA0NzAwMTB9.bBg85qTT8jHhTjmGtrxVvfYT7CgMrf4iRwYxyfUkD6Q
  IP_SERVER=http://localhost:3001
  IP_CLIENT=http://localhost:3000
  IP_CLIENT_NO_PORT=http://localhost/
  CABLE=ws://localhost:3001/cable
  ```
4. How to get YOUTUBE_API_KEY

5. In Project run command to build Docker:
  ```sh
  docker-compose up --build -d
  ```
6. Create Database & Migration
  ```sh
  docker-compose run backend rails db:setup
  ```

or
  ```sh
  docker-compose run backend rails db:create
  docker-compose run backend rails db:migrate
  ```

7. Open http://localhost:3000 to view project in the browser.
## Run Test
 1. Backend
  - Gem: Rspec, factory_bot_rails, rspec-rails
 ```sh
 docker-compose run -e RAILS_ENV=test backend bundle exec rspec
 ```
 2. Frontend
  - Jest
 ```sh
 docker-compose run frontend npx jest
 ```
## Usage
 1. In Index page, Video Listing, User can see all video without Logic/Register.
 2. Login/Register :
 -  User can login or Register if that is the first time.
 3. Share the Movie:
 - Once logged in, Click Button "Share a movie" to redirect share movie page.
 - In share movie page, Input the link from Youtube.
 - After submit, Website will redirect to Index page.
 4. Real-Time Notifications
 - After submit, - Once sent, other users will also see that notification.
 - On notification has the name of the person sending the link Youtube, and Youtube title.
