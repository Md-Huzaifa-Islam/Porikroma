#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Travel App Full Stack...${NC}"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

# Check Java
if command_exists java; then
    echo -e "${GREEN}✓ Java is installed${NC}"
else
    echo -e "${RED}✗ Java is not installed${NC}"
    echo -e "${YELLOW}Please install Java 21 or later${NC}"
    exit 1
fi

# Check Maven
if command_exists mvn; then
    echo -e "${GREEN}✓ Maven is installed${NC}"
else
    echo -e "${RED}✗ Maven is not installed${NC}"
    echo -e "${YELLOW}Please install Maven${NC}"
    exit 1
fi

# Check Node.js
if command_exists node; then
    echo -e "${GREEN}✓ Node.js is installed${NC}"
else
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo -e "${YELLOW}Please install Node.js${NC}"
    exit 1
fi

# Check npm
if command_exists npm; then
    echo -e "${GREEN}✓ npm is installed${NC}"
else
    echo -e "${RED}✗ npm is not installed${NC}"
    echo -e "${YELLOW}Please install npm${NC}"
    exit 1
fi

# Check MySQL
if command_exists mysql; then
    echo -e "${GREEN}✓ MySQL is installed${NC}"
else
    echo -e "${RED}✗ MySQL is not installed${NC}"
    echo -e "${YELLOW}MySQL installation is required${NC}"
fi

echo ""

# Setup MySQL (if needed)
echo -e "${YELLOW}🔧 MySQL Setup Instructions:${NC}"
echo -e "If MySQL is not properly configured, run these commands:"
echo -e "${BLUE}1. sudo mysql_secure_installation${NC}"
echo -e "${BLUE}2. sudo mysql -u root -p${NC}"
echo -e "${BLUE}3. CREATE DATABASE travel_app;${NC}"
echo -e "${BLUE}4. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'i am not a hacker';${NC}"
echo -e "${BLUE}5. FLUSH PRIVILEGES;${NC}"
echo -e "${BLUE}6. EXIT;${NC}"
echo ""

# Start backend
echo -e "${YELLOW}🏗️ Starting Backend (Spring Boot)...${NC}"
cd backend
echo -e "${BLUE}Building backend...${NC}"
mvn clean install -DskipTests &
BACKEND_BUILD_PID=$!

# Start frontend setup
echo -e "${YELLOW}🎨 Setting up Frontend (React + Vite)...${NC}"
cd ../frontend

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing frontend dependencies...${NC}"
    npm install
else
    echo -e "${BLUE}Checking frontend dependencies...${NC}"
    # Check if vite is properly installed
    if [ ! -f "node_modules/.bin/vite" ]; then
        echo -e "${YELLOW}Vite not found, reinstalling dependencies...${NC}"
        rm -rf node_modules package-lock.json
        npm cache clean --force
        npm install
    fi
fi

# Wait for backend build to complete
echo -e "${BLUE}Waiting for backend build to complete...${NC}"
wait $BACKEND_BUILD_PID

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend build completed successfully${NC}"
    
    # Start backend in background
    cd ../backend
    echo -e "${BLUE}Starting Spring Boot application...${NC}"
    mvn spring-boot:run &
    BACKEND_PID=$!
    
    # Give backend time to start
    sleep 10
    
    # Start frontend
    cd ../frontend
    echo -e "${BLUE}Starting React development server...${NC}"
    npm run dev &
    FRONTEND_PID=$!
    
    echo ""
    echo -e "${GREEN}🎉 Application is starting up!${NC}"
    echo -e "${YELLOW}📊 Backend API: http://localhost:8080/api${NC}"
    echo -e "${YELLOW}🌐 Frontend App: http://localhost:5173${NC}"
    echo ""
    echo -e "${BLUE}Press Ctrl+C to stop both servers${NC}"
    
    # Wait for user to stop
    trap 'kill $BACKEND_PID $FRONTEND_PID; echo -e "\n${GREEN}Servers stopped${NC}"; exit' INT
    wait
    
else
    echo -e "${RED}✗ Backend build failed${NC}"
    echo -e "${YELLOW}Please check the error messages above and fix any issues${NC}"
    exit 1
fi