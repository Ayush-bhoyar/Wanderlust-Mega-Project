#!/bin/bash

# Quick script to update the API URL for the frontend
# Usage: ./update-api-url.sh [API_URL]

API_URL=${1:-"http://localhost:31100"}

echo "Updating API URL to: $API_URL"

# Update the runtime configuration
cat > public/env-config.js << EOF
// Runtime environment configuration
// This file can be modified at deployment time without rebuilding
window._env_ = {
  VITE_API_PATH: window._env_?.VITE_API_PATH || "$API_URL"
};
EOF

echo "✅ Updated public/env-config.js"
echo "🔄 Please refresh your browser to see the changes"
echo ""
echo "Current API URL: $API_URL"
