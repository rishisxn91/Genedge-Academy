import Link from 'next/link'
import { 
  GraduationCap, 
  Brain, 
  MessageSquare, 
  Bot, 
  Wrench, 
  TrendingUp, 
  Zap,
  Check,
  Star,
  Users,
  Clock,
  Globe
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const learningTracks = [
  {
    icon: Brain,
    title: 'GEO & AI Fundamentals',
    description: 'Master the basics of AI and understand how to leverage it effectively',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: MessageSquare,
    title: 'Prompt Engineering',
    description: 'Learn to craft perfect prompts for maximum AI output quality',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    description: 'Build intelligent agents that work autonomously for you',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Wrench,
    title: 'AI Tools & Platforms',
    description: 'Master the latest AI tools and platforms for productivity',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: TrendingUp,
    title: 'AI for Earnings',
    description: 'Learn how to monetize AI skills and create income streams',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Zap,
    title: 'Everyday AI Integration',
    description: 'Integrate AI seamlessly into your daily workflow',
    color: 'from-yellow-500 to-yellow-600'
  }
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 999,
    description: 'Perfect for beginners starting their AI journey',
    features: [
      'Access to 3 courses',
      'Basic prompt engineering',
      'Community support',
      'Certificate of completion'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: 2999,
    description: 'Comprehensive learning for serious AI practitioners',
    features: [
      'Access to all courses',
      'Advanced prompt engineering',
      'AI tools mastery',
      'Priority support',
      'Project portfolio',
      'Career guidance'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 4999,
    description: 'Team training and corporate AI adoption',
    features: [
      'Everything in Professional',
      'Team management',
      'Custom content',
      'Dedicated support',
      'Analytics dashboard',
      'API access'
    ],
    popular: false
  }
]

const faqs = [
  {
    question: 'What makes GenEdge Academy different from other platforms?',
    answer: 'GenEdge Academy is India\'s first 100% self-paced AI learning platform. We focus on practical, real-world applications with no live sessions or cohort dependencies. Learn at your own pace, anytime, anywhere.'
  },
  {
    question: 'Do I need any prior technical knowledge?',
    answer: 'No! Our courses are designed for all skill levels. We start from the absolute basics and gradually build up to advanced concepts. Whether you\'re a complete beginner or an experienced professional, we have something for you.'
  },
  {
    question: 'How long do I have access to the courses?',
    answer: 'Once you enroll, you have lifetime access to all course materials, updates, and new content. There are no time restrictions or expiration dates.'
  },
  {
    question: 'What if I\'m not satisfied with the courses?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with your learning experience, we\'ll refund your purchase, no questions asked.'
  },
  {
    question: 'Can I get a certificate after completing courses?',
    answer: 'Yes! All our courses provide certificates of completion. These certificates are recognized by industry professionals and can be shared on your LinkedIn profile and resume.'
  },
  {
    question: 'How do I get support if I have questions?',
    answer: 'We provide comprehensive support through our community forum, email support, and detailed course materials. Our team of AI experts is always ready to help you succeed.'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-ge-50 to-white overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="heading-1 mb-6">
                Master AI Skills at{' '}
                <span className="text-ge-600">Your Own Pace</span>
              </h1>
              <p className="text-body mb-8 max-w-2xl lg:max-w-none">
                India&apos;s premier AI learning platform. Learn prompting, AI tools, and earn from AI with our comprehensive self-paced courses. No live sessions, no pressure - just pure learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/catalog" className="btn-primary text-lg px-8 py-4">
                  Browse Courses
                </Link>
                <Link href="/pricing" className="btn-outline text-lg px-8 py-4">
                  View Pricing
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-ge-600 mb-2">500+</div>
                  <div className="text-gray-600">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-ge-600 mb-2">25+</div>
                  <div className="text-gray-600">Courses Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-ge-600 mb-2">100%</div>
                  <div className="text-gray-600">Self-Paced</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-ge-600 mb-2">₹0</div>
                  <div className="text-gray-600">Hidden Fees</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main AI Learning Image */}
                <div className="relative bg-gradient-to-br from-ge-100 to-ge-200 rounded-2xl p-8 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-ge-400/20 to-transparent rounded-2xl"></div>
                  
                  {/* Floating Elements */}
                  <div className="relative z-20">
                    {/* Brain Icon */}
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Brain className="w-8 h-8 text-ge-600" />
                    </div>
                    
                    {/* Bot Icon */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Bot className="w-8 h-8 text-ge-600" />
                    </div>
                    
                    {/* Message Icon */}
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-ge-600" />
                    </div>
                    
                    {/* Trending Icon */}
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-ge-600" />
                    </div>
                    
                    {/* Central Learning Illustration */}
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        {/* Main Graduation Cap */}
                        <div className="w-24 h-24 bg-gradient-to-br from-ge-500 to-ge-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative">
                          <GraduationCap className="w-12 h-12 text-white" />
                          {/* Animated Ring */}
                          <div className="absolute inset-0 border-2 border-ge-300/50 rounded-full animate-ping"></div>
                        </div>
                        
                        {/* Learning Progress Bars */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-ge-600 font-medium">AI</span>
                            <div className="flex-1 h-2 bg-ge-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-ge-400 to-ge-500 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-ge-600 font-medium">ML</span>
                            <div className="flex-1 h-2 bg-ge-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-ge-400 to-ge-500 rounded-full animate-pulse" style={{ width: '70%', animationDelay: '0.3s' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-ge-600 font-medium">Prompt</span>
                            <div className="flex-1 h-2 bg-ge-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-ge-400 to-ge-500 rounded-full animate-pulse" style={{ width: '95%', animationDelay: '0.6s' }}></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Indicator */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                          <p className="text-sm font-medium text-ge-700">Learning in Progress</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-ge-300/30 to-transparent rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-ge-400/20 to-transparent rounded-full blur-xl"></div>
                
                {/* Floating Particles */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-ge-400/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-ge-500/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-ge-300/70 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-ge-600/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Comprehensive Learning Tracks</h2>
            <p className="text-body max-w-3xl mx-auto">
              Our structured learning paths cover everything from AI fundamentals to advanced applications, designed specifically for the Indian market and global opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningTracks.map((track, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${track.color} rounded-xl flex items-center justify-center mb-4`}>
                  <track.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="heading-3 mb-3">{track.title}</h3>
                <p className="text-gray-600">{track.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Transparent Pricing</h2>
            <p className="text-body max-w-3xl mx-auto">
              Choose the plan that fits your learning goals. All plans include lifetime access and our 30-day money-back guarantee.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`card relative ${plan.popular ? 'ring-2 ring-ge-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-ge-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="heading-3 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-ge-600 mb-1">
                    ₹{plan.price}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/pricing" 
                  className={`w-full text-center py-3 px-6 rounded-2xl font-semibold transition-colors duration-200 ${
                    plan.popular 
                      ? 'btn-primary' 
                      : 'btn-outline'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/pricing" className="btn-outline text-lg px-8 py-4">
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="text-body max-w-3xl mx-auto">
              Got questions? We've got answers. Here are the most common questions about GenEdge Academy.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="heading-3 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link href="mailto:contact@genedge.ac" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-ge-600 text-white">
        <div className="container text-center">
          <h2 className="heading-2 mb-4">Ready to Master AI?</h2>
          <p className="text-xl text-ge-100 mb-8 max-w-3xl mx-auto">
            Join thousands of learners who are already transforming their careers with AI. Start your journey today with our risk-free 30-day guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-white text-ge-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-2xl transition-colors duration-200">
              Start Learning Now
            </Link>
            <Link href="/catalog" className="border-2 border-white text-white hover:bg-white hover:text-ge-600 font-semibold py-4 px-8 rounded-2xl transition-colors duration-200">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
