#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const apps = ['backend', 'client', 'admin'];

console.log('Setting up environment variables...\n');

apps.forEach((app) => {
  const appDir = path.join(__dirname, '..', 'apps', app);
  const exampleFile = path.join(appDir, '.env.example');
  const envFile = path.join(appDir, '.env');

  if (fs.existsSync(exampleFile)) {
    if (!fs.existsSync(envFile)) {
      fs.copyFileSync(exampleFile, envFile);
      console.log(`✓ Created ${app}/.env from .env.example`);
    } else {
      console.log(`- ${app}/.env already exists (skipped)`);
    }
  } else {
    console.log(`⚠ ${app}/.env.example not found`);
  }
});

console.log('\nDone! Please update the .env files with your actual values.');
