# Google Cloud ステージング・本番用Dockerfile
FROM ruby:3.2.2

ARG RAILS_ENV
ARG RAILS_MASTER_KEY
ARG GOOGLE_PROJECT_ID

ENV RAILS_ENV=${RAILS_ENV}
ENV RAILS_MASTER_KEY=${RAILS_MASTER_KEY}
ENV GOOGLE_PROJECT_ID=${GOOGLE_PROJECT_ID}

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

COPY . /app

COPY docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "s", "-b", "0.0.0.0", "-p", "3000"]
