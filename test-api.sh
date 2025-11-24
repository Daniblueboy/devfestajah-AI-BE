#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default to production URL
API_URL="${1:-https://devfestajah-ai-be.onrender.com}"

echo -e "${YELLOW}Testing DevFest Ajah AI API${NC}"
echo -e "API URL: ${API_URL}\n"

# Test 1: Health Check
echo -e "${YELLOW}1. Testing Health Endpoint...${NC}"
HEALTH_RESPONSE=$(curl -s "${API_URL}/health")
if [[ $HEALTH_RESPONSE == *"ok"* ]]; then
    echo -e "${GREEN}✅ Health check passed${NC}"
    echo "Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ Health check failed${NC}"
    echo "Response: $HEALTH_RESPONSE"
fi

echo ""

# Test 2: Chat Endpoint
echo -e "${YELLOW}2. Testing Chat Endpoint...${NC}"
CHAT_RESPONSE=$(curl -s -X POST "${API_URL}/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, this is a test"}')

if [[ $CHAT_RESPONSE == *"reply"* ]]; then
    echo -e "${GREEN}✅ Chat endpoint working${NC}"
    echo "Response: $CHAT_RESPONSE" | head -c 200
    echo "..."
elif [[ $CHAT_RESPONSE == *"API_KEY"* ]] || [[ $CHAT_RESPONSE == *"API key"* ]]; then
    echo -e "${RED}❌ Chat endpoint failed - API KEY ERROR${NC}"
    echo -e "${RED}Action needed: Set GEMINI_API_KEY in Render environment variables${NC}"
    echo "Response: $CHAT_RESPONSE"
elif [[ $CHAT_RESPONSE == *"Failed to generate"* ]]; then
    echo -e "${RED}❌ Chat endpoint failed - Gemini API Error${NC}"
    echo -e "${RED}Check Render logs for details${NC}"
    echo "Response: $CHAT_RESPONSE"
else
    echo -e "${RED}❌ Chat endpoint failed${NC}"
    echo "Response: $CHAT_RESPONSE"
fi

echo ""

# Test 3: Code Helper Endpoint
echo -e "${YELLOW}3. Testing Code Helper Endpoint...${NC}"
CODE_RESPONSE=$(curl -s -X POST "${API_URL}/api/code-helper" \
  -H "Content-Type: application/json" \
  -d '{"code":"function test() { console.log(\"hello\"); }","context":"Improve this code"}')

if [[ $CODE_RESPONSE == *"suggestions"* ]] && [[ $CODE_RESPONSE == *"explanation"* ]]; then
    echo -e "${GREEN}✅ Code helper endpoint working${NC}"
    echo "Response: $CODE_RESPONSE" | head -c 200
    echo "..."
elif [[ $CODE_RESPONSE == *"API_KEY"* ]] || [[ $CODE_RESPONSE == *"API key"* ]]; then
    echo -e "${RED}❌ Code helper failed - API KEY ERROR${NC}"
    echo -e "${RED}Action needed: Set GEMINI_API_KEY in Render environment variables${NC}"
    echo "Response: $CODE_RESPONSE"
else
    echo -e "${RED}❌ Code helper endpoint failed${NC}"
    echo "Response: $CODE_RESPONSE"
fi

echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Test Complete${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "Usage: ./test-api.sh [API_URL]"
echo "Example: ./test-api.sh http://localhost:3000"
