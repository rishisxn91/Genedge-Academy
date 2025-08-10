#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

console.log('🔧 Setting up database...')

try {
  // Check if .env exists
  if (!existsSync('.env')) {
    console.log('⚠️  .env file not found. Creating one...')
    execSync('cp .env.example .env', { stdio: 'inherit' })
  }

  // Generate Prisma client
  console.log('📦 Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })

  // Run migrations
  console.log('🔄 Running database migrations...')
  execSync('npx prisma migrate deploy', { stdio: 'inherit' })

  // Seed the database if needed
  console.log('🌱 Seeding database...')
  execSync('npm run seed', { stdio: 'inherit' })

  console.log('✅ Database setup complete!')
} catch (error) {
  console.error('❌ Database setup failed:', error.message)
  process.exit(1)
}
