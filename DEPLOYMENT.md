# 🚀 Deployment Guide - GenEdge Academy

**Domain**: [www.genedgeacademy.com](https://www.genedgeacademy.com)

This guide will help you deploy GenEdge Academy to production with your domain.

## 📋 Prerequisites

- Domain: `www.genedgeacademy.com`
- Hosting provider (Vercel, Netlify, Railway, etc.)
- Database (PostgreSQL recommended)
- SSL certificate (usually provided by hosting)

## 🔧 Environment Setup

### 1. Production Environment Variables

Create a `.env.production` file or set these in your hosting platform:

```env
# Database
DATABASE_URL="your-production-database-url"

# JWT Secret (generate a strong secret)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Site URL
NEXT_PUBLIC_SITE_URL="https://www.genedgeacademy.com"

# Optional: Email Configuration
# SMTP_HOST="your-smtp-host"
# SMTP_PORT="587"
# SMTP_USER="your-smtp-user"
# SMTP_PASS="your-smtp-password"

# Optional: Payment Gateway
# RAZORPAY_KEY_ID="your-razorpay-key"
# RAZORPAY_KEY_SECRET="your-razorpay-secret"
```

### 2. Database Setup

For production, use a managed PostgreSQL service:

- **Vercel Postgres**
- **Supabase**
- **PlanetScale**
- **Railway Postgres**
- **AWS RDS**

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   # Deploy to Vercel
   vercel --prod
   ```

3. **Configure Domain**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Domains
   - Add `www.genedgeacademy.com`
   - Update DNS records as instructed

4. **Set Environment Variables**
   - Go to Settings → Environment Variables
   - Add all production environment variables

### Option 2: Netlify

1. **Build Command**
   ```bash
   npm run build:prod
   ```

2. **Publish Directory**
   ```
   .next
   ```

3. **Environment Variables**
   - Set in Netlify Dashboard
   - Go to Site Settings → Environment Variables

### Option 3: Railway

1. **Connect Repository**
   - Connect your GitHub repository
   - Railway will auto-detect Next.js

2. **Set Environment Variables**
   - Add all production environment variables
   - Set `NEXT_PUBLIC_SITE_URL=https://www.genedgeacademy.com`

3. **Deploy**
   - Railway will auto-deploy on push to main

## 🌐 Domain Configuration

### DNS Settings

Point your domain to your hosting provider:

```
Type    Name                    Value
A       @                       [Your hosting IP]
CNAME   www                     [Your hosting domain]
```

### SSL Certificate

Most hosting providers provide free SSL certificates:
- **Vercel**: Automatic SSL
- **Netlify**: Automatic SSL
- **Railway**: Automatic SSL

## 🔒 Security Checklist

- [ ] Strong JWT secret
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials protected
- [ ] Admin credentials changed
- [ ] Rate limiting enabled (if applicable)

## 📊 Performance Optimization

### 1. Image Optimization
- Images are automatically optimized by Next.js
- Domain is configured in `next.config.js`

### 2. Database Optimization
- Use connection pooling
- Enable database caching
- Optimize queries

### 3. CDN
- Vercel/Netlify provide global CDN
- Static assets are cached globally

## 🔍 Post-Deployment Checklist

- [ ] Website loads at `https://www.genedgeacademy.com`
- [ ] Admin panel accessible at `/admin`
- [ ] Course creation works
- [ ] User registration works
- [ ] Payment flow works (if enabled)
- [ ] Analytics tracking works
- [ ] Mobile responsiveness verified
- [ ] SSL certificate valid
- [ ] Performance monitoring set up

## 🛠️ Maintenance

### Regular Tasks
- Monitor database performance
- Check error logs
- Update dependencies
- Backup database
- Monitor SSL certificate expiry

### Updates
```bash
# Update dependencies
npm update

# Rebuild and redeploy
npm run build:prod
```

## 🆘 Troubleshooting

### Common Issues

1. **Domain not loading**
   - Check DNS settings
   - Verify hosting configuration
   - Check SSL certificate

2. **Database connection errors**
   - Verify DATABASE_URL
   - Check database credentials
   - Ensure database is accessible

3. **Admin panel not working**
   - Check JWT_SECRET
   - Verify admin user exists
   - Check authentication flow

### Support
- Check hosting provider documentation
- Review Next.js deployment guides
- Contact hosting provider support

## 📈 Monitoring

### Recommended Tools
- **Vercel Analytics** (if using Vercel)
- **Google Analytics**
- **Sentry** (error tracking)
- **Uptime Robot** (uptime monitoring)

### Key Metrics to Monitor
- Page load times
- Error rates
- Database performance
- User engagement
- Course completion rates

## 🎯 Production URLs

- **Main Site**: https://www.genedgeacademy.com
- **Admin Panel**: https://www.genedgeacademy.com/admin
- **Course Catalog**: https://www.genedgeacademy.com/catalog
- **User Dashboard**: https://www.genedgeacademy.com/dashboard

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:prod
      - run: npm run deploy
```

---

**🎉 Your GenEdge Academy platform is now ready for production!**

For additional support, refer to the hosting provider's documentation or contact the development team.
