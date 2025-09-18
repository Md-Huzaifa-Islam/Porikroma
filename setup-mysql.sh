#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 MySQL Setup for Travel App${NC}"
echo ""

# Check if MySQL is running
if ! systemctl is-active --quiet mysql; then
    echo -e "${YELLOW}Starting MySQL service...${NC}"
    sudo systemctl start mysql
fi

# Try to connect with empty password first
echo -e "${BLUE}Attempting to configure MySQL...${NC}"

# Create a temporary MySQL config file to avoid password prompts
cat > /tmp/mysql_setup.sql << EOF
-- Create database
CREATE DATABASE IF NOT EXISTS travel_app;

-- Set password for root user
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'i am not a hacker';

-- Refresh privileges
FLUSH PRIVILEGES;

-- Show databases to confirm
SHOW DATABASES;
EOF

# Try to execute the setup
echo -e "${YELLOW}Setting up database and user...${NC}"

# Try different approaches to connect to MySQL
if sudo mysql -u root < /tmp/mysql_setup.sql 2>/dev/null; then
    echo -e "${GREEN}✓ MySQL setup completed successfully!${NC}"
    echo -e "${GREEN}✓ Database 'travel_app' created${NC}"
    echo -e "${GREEN}✓ Root password set to: 'i am not a hacker'${NC}"
elif mysql -u root < /tmp/mysql_setup.sql 2>/dev/null; then
    echo -e "${GREEN}✓ MySQL setup completed successfully!${NC}"
    echo -e "${GREEN}✓ Database 'travel_app' created${NC}"
    echo -e "${GREEN}✓ Root password set to: 'i am not a hacker'${NC}"
else
    echo -e "${RED}✗ Could not automatically setup MySQL${NC}"
    echo -e "${YELLOW}Please run the following commands manually:${NC}"
    echo ""
    echo -e "${BLUE}1. Connect to MySQL:${NC}"
    echo -e "   sudo mysql -u root"
    echo ""
    echo -e "${BLUE}2. Run these SQL commands:${NC}"
    echo -e "   CREATE DATABASE IF NOT EXISTS travel_app;"
    echo -e "   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'i am not a hacker';"
    echo -e "   FLUSH PRIVILEGES;"
    echo -e "   EXIT;"
    echo ""
    
    # Clean up
    rm -f /tmp/mysql_setup.sql
    exit 1
fi

# Clean up
rm -f /tmp/mysql_setup.sql

# Test the connection
echo -e "${YELLOW}Testing database connection...${NC}"
if mysql -u root -p'i am not a hacker' -e "USE travel_app; SELECT 'Connection successful!' as status;" 2>/dev/null; then
    echo -e "${GREEN}✓ Database connection test passed!${NC}"
    echo ""
    echo -e "${GREEN}🎉 MySQL is now ready for the Travel App!${NC}"
    echo ""
    echo -e "${BLUE}You can now run:${NC}"
    echo -e "   ./start.sh"
    echo ""
else
    echo -e "${RED}✗ Database connection test failed${NC}"
    echo -e "${YELLOW}Please check the MySQL setup manually${NC}"
fi