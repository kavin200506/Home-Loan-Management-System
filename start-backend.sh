#!/bin/bash

echo "🚀 Starting Spring Boot Backend..."
echo "=================================="

cd "$(dirname "$0")/springapp"

# Make mvnw executable
chmod +x mvnw

# Start Spring Boot
./mvnw spring-boot:run


