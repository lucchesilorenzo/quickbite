FROM php:8.4.2-fpm

WORKDIR /app

RUN apt-get update -y && apt-get install -y \
  openssl \
  zip \
  unzip \
  git \
  libpq-dev \
  graphviz

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo pdo_pgsql pcntl

COPY . .

RUN chmod +x ./entrypoint.sh

RUN composer install

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]