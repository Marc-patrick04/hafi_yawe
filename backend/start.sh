#!/bin/bash

# Install dependencies
composer install --no-dev --optimize-autoloader

# Generate key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Start server
php artisan serve --host=0.0.0.0 --port=8080