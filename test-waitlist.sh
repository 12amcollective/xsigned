#!/bin/bash

# XSignedAI Waitlist API Test Script
# Run this to test all waitlist endpoints

echo "🧪 Testing XSignedAI Waitlist API Endpoints"
echo "============================================="

BASE_URL="http://localhost:5173/api"

echo ""
echo "1️⃣ Testing Waitlist Health Check..."
curl -s -X GET "${BASE_URL}/waitlist/health" -H "Accept: application/json" | jq '.'

echo ""
echo "2️⃣ Testing Waitlist Stats..."
curl -s -X GET "${BASE_URL}/waitlist/stats" -H "Accept: application/json" | jq '.'

echo ""
echo "3️⃣ Testing Get All Waitlist Entries..."
curl -s -X GET "${BASE_URL}/waitlist/" -H "Accept: application/json" | jq '.'

echo ""
echo "4️⃣ Testing Join Waitlist (with test email)..."
curl -s -X POST "${BASE_URL}/waitlist/join" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"testuser@example.com"}' | jq '.'

echo ""
echo "5️⃣ Testing Updated Stats After Join..."
curl -s -X GET "${BASE_URL}/waitlist/stats" -H "Accept: application/json" | jq '.'

echo ""
echo "6️⃣ Testing Duplicate Email (should handle gracefully)..."
curl -s -X POST "${BASE_URL}/waitlist/join" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"testuser@example.com"}' | jq '.'

echo ""
echo "✅ Waitlist API testing complete!"
