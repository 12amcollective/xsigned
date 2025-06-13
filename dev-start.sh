#!/bin/bash

# XSignedAI Development Setup Script
# This script helps you start the development environment

echo "🚀 XSignedAI Development Setup"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the XSignedAI frontend directory"
    exit 1
fi

# Function to check if backend is running
check_backend() {
    echo "🔍 Checking if backend is running..."
    if curl -s http://localhost:5001/health > /dev/null 2>&1; then
        echo "✅ Backend is running at http://localhost:5001"
        return 0
    else
        echo "❌ Backend is not running at http://localhost:5001"
        return 1
    fi
}

# Function to start backend
start_backend() {
    echo "🐳 Backend is not running. Please start it manually:"
    echo ""
    echo "   1. Navigate to your backend repository"
    echo "   2. Run: docker-compose -f docker-compose.dev.yml up -d"
    echo ""
    echo "   Or if you don't have docker-compose.dev.yml:"
    echo "   2. Run: docker-compose up -d"
    echo ""
    read -p "Press Enter once you've started the backend services..."
}

# Main execution
echo ""

# Check if backend is running
if ! check_backend; then
    start_backend
    
    # Check again after user confirmation
    if ! check_backend; then
        echo "⚠️  Backend still not detected, but continuing anyway..."
        echo "   You can start the frontend and connect the backend later."
    fi
fi

echo ""
echo "🎨 Starting frontend development server..."
echo "📱 Frontend will be available at: http://localhost:5173"
echo "🔌 Backend API endpoint: http://localhost:5001/api"
echo ""
echo "💡 Tip: The frontend will hot-reload as you make changes!"
echo ""

# Start the frontend development server
npm run dev
