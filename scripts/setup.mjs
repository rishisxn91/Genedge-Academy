#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, copyFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('🚀 Setting up GenEdge Academy...')

// Check if .env file exists
if (!existsSync('.env')) {
  console.log('📝 Creating .env file...')
  copyFileSync('env.example', '.env')
  console.log('✅ .env file created')
} else {
  console.log('✅ .env file already exists')
}

// Install dependencies
console.log('📦 Installing dependencies...')
try {
  execSync('npm install', { stdio: 'inherit' })
  console.log('✅ Dependencies installed')
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message)
  process.exit(1)
}

// Generate Prisma client
console.log('🗄️ Generating Prisma client...')
try {
  execSync('npx prisma generate', { stdio: 'inherit' })
  console.log('✅ Prisma client generated')
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error.message)
  process.exit(1)
}

// Run database migrations
console.log('🔄 Running database migrations...')
try {
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' })
  console.log('✅ Database migrations completed')
} catch (error) {
  console.error('❌ Failed to run migrations:', error.message)
  process.exit(1)
}

// Seed the database
console.log('🌱 Seeding database...')
try {
  execSync('npm run seed', { stdio: 'inherit' })
  console.log('✅ Database seeded')
} catch (error) {
  console.error('❌ Failed to seed database:', error.message)
  process.exit(1)
}

console.log('\n🎉 Setup completed successfully!')
console.log('\n📋 Next steps:')
console.log('1. Update your .env file with your database credentials')
console.log('2. Run "npm run dev" to start the development server')
console.log('3. Visit http://localhost:3000 to see your application')
console.log('\n🔑 Default admin credentials:')
console.log('   Email: admin@genedge.ac')
console.log('   Password: admin123')
