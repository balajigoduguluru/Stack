#!/bin/bash
set -e

echo "🚀 Starting Stack 2.0 Local Development Environment..."

# Spin up Docker containers in detached mode
docker-compose up -d

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo "✅ Databases are running!"
echo "PostgreSQL running on localhost:5432 (User: postgres, Password: password, DB: stack_dev)"
echo "Redis running on localhost:6379"
