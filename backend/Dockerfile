FROM ruby:3.2.2

RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list
RUN apt-get update && apt-get install -y postgresql-client
RUN apt-get update && apt-get install -y libpq-dev nano
RUN apt-get -y install nodejs
RUN apt-get install -y redis-server
RUN mkdir /backend
WORKDIR /backend

CMD service redis-server start && mailhog

COPY Gemfile /Gemfile
COPY Gemfile.lock /Gemfile.lock

RUN bundle install

COPY . /backend
