# GenEdge Academy - AI Learning Platform

**🌐 Live Website**: [www.genedgeacademy.com](https://www.genedgeacademy.com)

A comprehensive AI learning platform built with Next.js, featuring self-paced courses, progress tracking, and payment integration.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with role-based access
- **Course Management**: Create, edit, and manage courses with modules and lectures
- **Progress Tracking**: Track learning progress with detailed analytics
- **Payment Integration**: Mock Razorpay integration for course purchases
- **Responsive Design**: Modern, mobile-first UI built with Tailwind CSS
- **Admin Panel**: Comprehensive admin interface for course management
- **Self-Paced Learning**: No live sessions, pure self-paced learning experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **Payments**: Mock Razorpay integration
- **Testing**: Vitest with React Testing Library

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd genedge-academy
```

### 2. Run the setup script
```bash
node scripts/setup.mjs
```

This script will:
- Create a `.env` file from the template
- Install dependencies
- Generate Prisma client
- Run database migrations
- Seed the database with initial data

### 3. Configure your environment
Update the `.env` file with your database credentials:

```env
# Development
DATABASE_URL="postgresql://username:password@localhost:5432/genedge_academy"
JWT_SECRET="your-super-secret-jwt-key-here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Production
# DATABASE_URL="your-production-database-url"
# JWT_SECRET="your-production-jwt-secret"
# NEXT_PUBLIC_SITE_URL="https://www.genedgeacademy.com"
```

### 4. Start the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🔑 Default Credentials

- **Admin User**:
  - Email: `admin@genedge.ac`
  - Password: `admin123`

## 📁 Project Structure

```
genedge-academy/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── courses/       # Course management
│   │   │   ├── enrollments/   # Enrollment management
│   │   │   ├── progress/      # Progress tracking
│   │   │   └── payments/      # Payment processing
│   │   ├── auth/              # Authentication pages
│   │   ├── course/            # Course viewing pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── admin/             # Admin panel
│   │   ├── catalog/           # Course catalog
│   │   └── pricing/           # Pricing page
│   ├── components/            # Reusable components
│   └── lib/                   # Utility functions and configurations
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
└── scripts/                   # Setup and utility scripts
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Authentication and user management
- **Courses**: Course content and metadata
- **Modules**: Course sections
- **Lectures**: Individual video lessons
- **Enrollments**: User course enrollments
- **Progress**: Learning progress tracking
- **Payments**: Payment records

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run build:prod` - Build for production with domain
- `npm run start:prod` - Start production server with domain
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run seed` - Seed database with sample data

## �� API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create new course (admin only)
- `GET /api/courses/[id]` - Get course details
- `PUT /api/courses/[id]` - Update course (admin only)
- `DELETE /api/courses/[id]` - Delete course (admin only)

### Enrollments
- `POST /api/enrollments` - Enroll in a course

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Update progress

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment

## 🎨 Customization

### Styling
The application uses Tailwind CSS with custom colors defined in `tailwind.config.js`. The primary brand color is `ge` (GenEdge).

### Components
Reusable components are located in `src/components/` and can be customized to match your design requirements.

## 🚀 Deployment

### Production Build
For production deployment with your domain:

```bash
# Build for production with domain
npm run build:prod

# Start production server
npm run start:prod
```

### Environment Variables for Production
Set these environment variables in your production environment:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXT_PUBLIC_SITE_URL="https://www.genedgeacademy.com"
```

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_SITE_URL=https://www.genedgeacademy.com`
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Domain Configuration
- **Primary Domain**: www.genedgeacademy.com
- **SSL Certificate**: Required for production
- **DNS**: Point to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔮 Roadmap

- [ ] Real Razorpay integration
- [ ] Video streaming optimization
- [ ] Mobile app development
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Live chat support
- [ ] Certificate generation
- [ ] Social learning features
