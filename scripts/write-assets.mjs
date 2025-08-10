#!/usr/bin/env node

import { writeFileSync, existsSync } from 'fs'
import { join } from 'path'

console.log('📝 Writing assets...')

// Create a simple favicon if it doesn't exist
const faviconPath = join(process.cwd(), 'public', 'favicon.svg')
if (!existsSync(faviconPath)) {
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
</svg>`
  writeFileSync(faviconPath, faviconSvg)
  console.log('✅ Created favicon.svg')
}

// Create a simple og image if it doesn't exist
const ogImagePath = join(process.cwd(), 'public', 'og.png')
if (!existsSync(ogImagePath)) {
  // Create a simple placeholder (in production, you'd want a real image)
  console.log('ℹ️  og.png not found - you may want to add a proper Open Graph image')
}

console.log('✅ Assets setup complete')
