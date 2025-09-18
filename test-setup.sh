#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Testing Travel App Components${NC}"
echo ""

# Test 1: Check if all required files exist
echo -e "${YELLOW}📁 Checking project structure...${NC}"

# Backend files
if [ -f "backend/pom.xml" ]; then
    echo -e "${GREEN}✓ Backend pom.xml found${NC}"
else
    echo -e "${RED}✗ Backend pom.xml missing${NC}"
fi

if [ -f "backend/src/main/java/com/travelapp/TravelBackendApplication.java" ]; then
    echo -e "${GREEN}✓ Backend main application found${NC}"
else
    echo -e "${RED}✗ Backend main application missing${NC}"
fi

# Frontend files
if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓ Frontend package.json found${NC}"
else
    echo -e "${RED}✗ Frontend package.json missing${NC}"
fi

if [ -f "frontend/src/main.tsx" ]; then
    echo -e "${GREEN}✓ Frontend main.tsx found${NC}"
else
    echo -e "${RED}✗ Frontend main.tsx missing${NC}"
fi

echo ""

# Test 2: Check MySQL service
echo -e "${YELLOW}🗄️ Checking MySQL service...${NC}"
if systemctl is-active --quiet mysql; then
    echo -e "${GREEN}✓ MySQL service is running${NC}"
else
    echo -e "${RED}✗ MySQL service is not running${NC}"
    echo -e "${YELLOW}Run: sudo systemctl start mysql${NC}"
fi

echo ""

# Test 3: Try to build backend (quick compile check)
echo -e "${YELLOW}🏗️ Testing backend build...${NC}"
cd backend
if mvn compile -q 2>/dev/null; then
    echo -e "${GREEN}✓ Backend compiles successfully${NC}"
else
    echo -e "${RED}✗ Backend compilation failed${NC}"
    echo -e "${YELLOW}Run: cd backend && mvn clean compile${NC}"
fi
cd ..

echo ""

# Test 4: Check frontend dependencies
echo -e "${YELLOW}🎨 Checking frontend setup...${NC}"
cd frontend
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Frontend dependencies not installed${NC}"
    echo -e "${YELLOW}Run: cd frontend && npm install${NC}"
fi
cd ..

echo ""
echo -e "${BLUE}📋 Summary:${NC}"
echo -e "1. If all components are ${GREEN}✓${NC}, you can run: ${BLUE}./start.sh${NC}"
echo -e "2. For MySQL issues, try: ${BLUE}./setup-mysql.sh${NC}"
echo -e "3. For manual setup, see: ${BLUE}README.md${NC}"
echo ""