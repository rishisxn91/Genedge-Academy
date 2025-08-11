import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@genedge.ac' },
    update: {},
    create: {
      email: 'admin@genedge.ac',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Prompting Mastery (Hindi)',
      description: 'Master the art of prompt engineering in Hindi. Learn to create effective prompts for AI tools and maximize their potential.',
      pricePaise: 299900, // ₹2,999
      published: true,
      authorId: admin.id,
    },
  })

  const course2 = await prisma.course.create({
    data: {
      title: 'AI in 1 Hour — Beginner Kickstart',
      description: 'Understand key concepts and ship your first AI mini‑project. Perfect for complete beginners who want to get started with AI quickly.',
      pricePaise: 0, // Free
      published: true,
      authorId: admin.id,
    },
  })

  console.log('✅ Courses created:', course1.title, 'and', course2.title)

  // Create modules for course 1
  const module1 = await prisma.module.create({
    data: {
      title: 'Introduction to Prompting',
      description: 'Learn the fundamentals of prompt engineering',
      order: 1,
      courseId: course1.id,
    },
  })

  console.log('✅ Module created:', module1.title)

  // Create lectures
  const lecture1 = await prisma.lecture.create({
    data: {
      title: 'What is Prompt Engineering?',
      description: 'Understanding the basics of prompt engineering and its importance',
      videoUrl: '/videos/sample1.mp4',
      durationSec: 300, // 5 minutes
      order: 1,
      freePreview: true,
      moduleId: module1.id,
    },
  })

  const lecture2 = await prisma.lecture.create({
    data: {
      title: 'Basic Prompt Structure',
      description: 'Learn the fundamental structure of effective prompts',
      videoUrl: '/videos/sample2.mp4',
      durationSec: 450, // 7.5 minutes
      order: 2,
      freePreview: false,
      moduleId: module1.id,
    },
  })

  console.log('✅ Lectures created:', lecture1.title, 'and', lecture2.title)

  // Create a second module for course 1
  const module2 = await prisma.module.create({
    data: {
      title: 'Advanced Prompting Techniques',
      description: 'Master advanced prompt engineering techniques',
      order: 2,
      courseId: course1.id,
    },
  })

  console.log('✅ Second module created:', module2.title)

  // Create more lectures
  const lecture3 = await prisma.lecture.create({
    data: {
      title: 'Chain of Thought Prompting',
      description: 'Learn how to use chain of thought prompting for complex tasks',
      videoUrl: '/videos/sample3.mp4',
      durationSec: 600, // 10 minutes
      order: 1,
      freePreview: false,
      moduleId: module2.id,
    },
  })

  const lecture4 = await prisma.lecture.create({
    data: {
      title: 'Few-Shot Learning',
      description: 'Master few-shot learning techniques for better AI responses',
      videoUrl: '/videos/sample4.mp4',
      durationSec: 540, // 9 minutes
      order: 2,
      freePreview: false,
      moduleId: module2.id,
    },
  })

  console.log('✅ Advanced lectures created:', lecture3.title, 'and', lecture4.title)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
