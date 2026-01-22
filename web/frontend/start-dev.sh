#!/bin/bash

# Start Next.js development server
# Make sure backend is running on port 8000

echo "Starting Justlogo Next.js frontend..."
echo "Backend should be running on http://localhost:8000"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start development server
npm run dev
