#!/bin/bash

echo "🚀 Starting Travel App Backend..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java not found. Please install Java 17 or higher."
    exit 1
fi

# Navigate to backend directory
cd /home/md-huzaifa-islam/Downloads/project/backend

# Try to start using IDE configuration or direct class execution
echo "📦 Attempting to start Spring Boot application..."

# Method 1: Try with Spring Boot Maven plugin
if command -v mvn &> /dev/null; then
    echo "🔧 Using Maven to start application..."
    mvn spring-boot:run
elif command -v gradle &> /dev/null; then
    echo "🔧 Using Gradle to start application..."
    gradle bootRun
else
    echo "⚠️  Neither Maven nor Gradle found."
    echo "🔧 Please install Maven or Gradle to run the Spring Boot application."
    echo ""
    echo "Alternative: Use your IDE to run TravelBackendApplication.java"
    echo "🗄️  Database is ready at: jdbc:mysql://localhost:3306/travel_app_db"
    echo "👤 Database user: root"
    echo "🔐 Database password: i am not a hacker"
    echo ""
    echo "📋 Backend API endpoints will be available at: http://localhost:8080"
    echo "📋 Sample endpoints:"
    echo "   GET  http://localhost:8080/api/destinations"
    echo "   GET  http://localhost:8080/api/accommodations" 
    echo "   GET  http://localhost:8080/api/transportation"
    echo "   GET  http://localhost:8080/api/local-services"
    echo "   POST http://localhost:8080/api/auth/register"
    echo "   POST http://localhost:8080/api/auth/login"
fi