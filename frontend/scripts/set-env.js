#!/usr/bin/env node

/**
 * Production Environment Configuration Script
 * This script allows you to set environment variables at runtime without rebuilding
 */

const fs = require('fs');
const path = require('path');

// Default configuration
const defaultConfig = {
  VITE_API_PATH: 'http://localhost:31100'
};

// Get environment variables from process.env or use defaults
const config = {
  VITE_API_PATH: process.env.VITE_API_PATH || process.env.API_PATH || defaultConfig.VITE_API_PATH
};

// Create the env-config.js content
const envConfigContent = `// Runtime environment configuration
// This file is generated automatically - do not edit manually
// Generated at: ${new Date().toISOString()}
window._env_ = {
  VITE_API_PATH: "${config.VITE_API_PATH}"
};
`;

// Write the configuration file
const envConfigPath = path.join('/usr', 'share', 'nginx', 'html', 'env-config.js');
fs.writeFileSync(envConfigPath, envConfigContent);

console.log('Environment configuration updated:');
console.log(`  API Path: ${config.VITE_API_PATH}`);
console.log(`  Config file: ${envConfigPath}`);
