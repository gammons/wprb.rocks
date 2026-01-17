FROM ruby:3.3.7

RUN apt-get update -qq && apt-get install -y build-essential libsqlite3-dev

EXPOSE 3000

RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp
