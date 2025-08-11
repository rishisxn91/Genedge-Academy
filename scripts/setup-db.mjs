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

  // Run migrations (optional - will use memory store if fails)
  console.log('🔄 Running database migrations...')
  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' })
  } catch (error) {
    console.log('⚠️  Database migration failed, will use memory store')
  }

  // Seed the database if needed (optional)
  console.log('🌱 Seeding database...')
  try {
    execSync('npm run seed', { stdio: 'inherit' })
  } catch (error) {
    console.log('⚠️  Database seeding failed, will use memory store')
  }

  console.log('✅ Database setup complete!')
} catch (error) {
  console.error('❌ Database setup failed:', error.message)
  process.exit(1)
}
