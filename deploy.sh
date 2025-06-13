#!/bin/bash

# XSignedAI Frontend Deployment Script
# This script builds and deploys the React frontend to the Raspberry Pi

set -e  # Exit on any error

echo "🚀 Starting XSignedAI Frontend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration (update these with your Pi details)
PI_USER="pi"  # Change to your Pi username
PI_HOST="your-pi-ip-address"  # Change to your Pi IP address
PI_PROJECT_PATH="/home/pi/xsigned"  # Change to your project path on Pi

echo -e "${YELLOW}Building React app for production...${NC}"
npm run build

echo -e "${YELLOW}Creating deployment package...${NC}"
tar -czf deployment.tar.gz dist/ package.json Dockerfile.frontend nginx-frontend.conf .env.production

echo -e "${YELLOW}Copying files to Raspberry Pi...${NC}"
scp deployment.tar.gz ${PI_USER}@${PI_HOST}:${PI_PROJECT_PATH}/

echo -e "${YELLOW}Deploying on Raspberry Pi...${NC}"
ssh ${PI_USER}@${PI_HOST} << EOF
    cd ${PI_PROJECT_PATH}
    
    # Extract files
    tar -xzf deployment.tar.gz
    
    # Copy production env file
    cp .env.production .env
    
    # Rebuild frontend container
    docker-compose down frontend || true
    docker-compose build frontend
    docker-compose up -d frontend
    
    # Clean up
    rm deployment.tar.gz
    
    echo "Frontend deployment complete!"
EOF

# Clean up local deployment package
rm deployment.tar.gz

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}Frontend should be available at: https://xsigned.ai${NC}"
