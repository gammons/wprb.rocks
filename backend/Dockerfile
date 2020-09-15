FROM ruby:2.7.1

RUN apt-get update -qq
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

EXPOSE 3000

RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp
