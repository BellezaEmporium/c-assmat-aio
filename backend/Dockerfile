FROM php:8.3-fpm

# Install system deps
RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libjpeg-dev libfreetype6-dev libssl-dev pkg-config libcurl4-openssl-dev && \
    docker-php-ext-install pdo pdo_mysql && \
    pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-interaction --prefer-dist

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
