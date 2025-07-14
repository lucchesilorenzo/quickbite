#!/bin/bash

# Take the APP_KEY from the .env file
APP_KEY=$(grep '^APP_KEY=' .env | cut -d '=' -f2)

# Get the table count
TABLE_COUNT=$(php artisan tinker --execute='echo count(DB::select("SELECT * FROM pg_tables WHERE schemaname = '\''public'\''"));')

# Generate the APP_KEY
if [ -z "$APP_KEY" ]; then
  echo "APP_KEY not found in .env, generating..."

  php artisan key:generate
fi

# Create the storage link
if [ ! -L "public/storage" ]; then
  echo "Creating storage link..." 

  php artisan storage:link
fi

echo "For security reasons, the storage link will be recreated..."

rm -rf public/storage
php artisan storage:link

# Migrate and seed the database
if [ "$TABLE_COUNT" -eq 0 ]; then
  echo "Migrating and seeding database..."
  
  php artisan migrate --seed
fi

# Start the server
php artisan serve --host=0.0.0.0 --port=8000 &

# Wait for the server to start
sleep 1

# Run pail
php artisan pail --timeout=0
