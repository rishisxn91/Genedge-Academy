'use client'

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
  Globe,
  Play,
  ArrowRight,
  Shield,
  Award,
  Target,
  DollarSign,
  Timer,
  Sparkles
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const courseBenefits = [
  {
    icon: Target,
    title: 'Build AI Agents to automate your business in 7 days',
    description: 'Create intelligent bots that handle customer service, data analysis, and repetitive tasks automatically',
    step: 'Learn'
  },
  {
    icon: DollarSign,
    title: 'Generate ₹50,000+ monthly income with AI freelancing',
    description: 'Master prompt engineering and AI tools to land high-paying freelance projects',
    step: 'Apply'
  },
  {
    icon: TrendingUp,
    title: 'Scale your business 10x faster with AI automation',
    description: 'Implement AI solutions that reduce costs by 70% while increasing productivity',
    step: 'Earn'
  }
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Marketing Manager',
    company: 'TechCorp India',
    image: '/testimonials/priya.jpg',
    content: 'GenEdge Academy transformed my career! I went from ₹45,000 to ₹1.2L per month in just 3 months by mastering AI automation.',
    rating: 5
  },
  {
    name: 'Rahul Patel',
    role: 'Freelance Consultant',
    company: 'Self-Employed',
    image: '/testimonials/rahul.jpg',
    content: 'The AI Agents course helped me build automated systems for 5 clients. Now earning ₹80,000/month passively!',
    rating: 5
  },
  {
    name: 'Anjali Desai',
    role: 'Business Owner',
    company: 'Digital Solutions',
    image: '/testimonials/anjali.jpg',
    content: 'Invested ₹3,499 in the Professional plan. Generated ₹2.5L in new business within 60 days. Best ROI ever!',
    rating: 5
  },
  {
    name: 'Vikram Singh',
    role: 'Software Engineer',
    company: 'MNC Tech',
    image: '/testimonials/vikram.jpg',
    content: 'From coding to AI consulting. GenEdge Academy gave me the skills to charge ₹5,000/hour for AI projects.',
    rating: 5
  }
]

const trustSignals = [
  { number: '15,000+', label: 'Students Enrolled' },
  { number: '₹50Cr+', label: 'Student Earnings' },
  { number: '500+', label: 'Corporate Partnerships' },
  { number: '98%', label: 'Success Rate' }
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 999,
    originalPrice: 1999,
    description: 'Limited Access - Basic AI Skills',
    features: [
      'Access to 3 courses only',
      'Basic prompt engineering',
      'Community support',
      'Certificate of completion',
      'No project portfolio',
      'No career guidance'
    ],
    popular: false,
    savings: '50% OFF'
  },
  {
    name: 'Professional',
    price: 3499,
    originalPrice: 4999,
    description: 'Most Popular - Complete AI Mastery',
    features: [
      'Access to ALL 25+ courses',
      'Advanced AI Agents & Automation',
      'AI Tools & Platforms Mastery',
      'Priority 24/7 support',
      'Professional project portfolio',
      'Career guidance & job placement',
      'Exclusive AI templates library',
      'Monthly live Q&A sessions'
    ],
    popular: true,
    savings: '30% OFF'
  },
  {
    name: 'Enterprise',
    price: 5499,
    originalPrice: 7999,
    description: 'Full Access + Premium Features',
    features: [
      'Everything in Professional',
      'Custom AI solution development',
      '1-on-1 mentoring sessions',
      'Dedicated success manager',
      'Advanced analytics dashboard',
      'API access & integrations',
      'White-label solutions',
      'Team management tools'
    ],
    popular: false,
    savings: '31% OFF'
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
      <section className="section bg-gradient-to-br from-ge-50 to-white overflow-hidden relative">
        {/* Limited Time Offer Badge */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
            ⏰ LIMITED TIME: 30% OFF Professional Plan - Ends Soon!
          </div>
        </div>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master AI & <span className="text-ge-600">10x Your Income</span> in 90 Days
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl lg:max-w-none leading-relaxed">
                India's #1 AI Skills Platform — Learn, Earn & Lead with AI. Join 15,000+ professionals who've transformed their careers and businesses with our proven AI mastery system.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/auth/signup" className="bg-ge-600 hover:bg-ge-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#demo" className="border-2 border-ge-600 text-ge-600 hover:bg-ge-600 hover:text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </div>

              {/* Urgency & Scarcity */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                  <Timer className="w-5 h-5" />
                  Only 47 spots left for August batch
                </div>
              </div>
              
              {/* Trust Signals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trustSignals.map((signal, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-ge-600 mb-1">{signal.number}</div>
                    <div className="text-sm text-gray-600">{signal.label}</div>
                  </div>
                ))}
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

      {/* Authority & Social Proof Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by 15,000+ Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the ranks of successful professionals who've transformed their careers with AI
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-ge-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>

          {/* Media Mentions */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">Featured in</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Times of India</div>
              <div className="text-2xl font-bold text-gray-400">Economic Times</div>
              <div className="text-2xl font-bold text-gray-400">YourStory</div>
              <div className="text-2xl font-bold text-gray-400">Inc42</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Benefits Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Path to AI Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our proven 3-step system that has helped thousands achieve their AI goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courseBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
                <div className="absolute -top-4 left-8 bg-ge-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Step {index + 1}: {benefit.step}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-ge-500 to-ge-600 rounded-2xl flex items-center justify-center mb-6 mt-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Competitive Pricing Strategy */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your AI Success Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your AI journey today with our risk-free 7-day money-back guarantee
            </p>
          </div>
          
          {/* Countdown Timer */}
          <div className="text-center mb-12">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 inline-block">
              <div className="flex items-center justify-center gap-4 text-red-700">
                <Timer className="w-6 h-6" />
                <span className="font-bold text-lg">Current pricing ends in: 2 days 14 hours 32 minutes</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 relative transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-ge-500 scale-105 shadow-2xl' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}
                
                {plan.savings && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {plan.savings}
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-ge-600">₹{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">₹{plan.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/auth/signup" 
                  className={`w-full text-center py-4 px-6 rounded-2xl font-bold transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-ge-600 hover:bg-ge-700 text-white transform hover:scale-105 shadow-lg' 
                      : 'border-2 border-ge-600 text-ge-600 hover:bg-ge-600 hover:text-white'
                  }`}
                >
                  {plan.popular ? 'Enroll Now - Best Value' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
          
          {/* Money-back Guarantee */}
          <div className="text-center mt-12">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 inline-block">
              <div className="flex items-center justify-center gap-3 text-green-700">
                <Shield className="w-6 h-6" />
                <span className="font-semibold">7-Day Money-Back Guarantee - No Questions Asked</span>
              </div>
            </div>
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

      {/* Final Conversion Push */}
      <section className="section bg-gradient-to-br from-ge-600 to-ge-700 text-white">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">Start Learning Risk-Free Today</h2>
            <p className="text-2xl text-ge-100 mb-8 leading-relaxed">
              Join 15,000+ professionals who've already transformed their careers. Full refund within 7 days if you're not completely satisfied.
            </p>
            
            {/* Urgency & Scarcity */}
            <div className="bg-red-500 text-white px-8 py-4 rounded-2xl mb-8 inline-block">
              <div className="flex items-center justify-center gap-3 font-bold text-lg">
                <Timer className="w-6 h-6" />
                Only 47 spots left for August batch - Enroll Now!
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link href="/auth/signup" className="bg-white text-ge-600 hover:bg-gray-100 font-bold text-xl py-6 px-12 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6" />
                Enroll Now - Start Earning
              </Link>
              <Link href="#demo" className="border-2 border-white text-white hover:bg-white hover:text-ge-600 font-semibold text-xl py-6 px-12 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3">
                <Play className="w-6 h-6" />
                Watch Success Stories
              </Link>
            </div>
            
            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">15,000+</div>
                <div className="text-ge-100">Students Enrolled</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">₹50Cr+</div>
                <div className="text-ge-100">Student Earnings</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-ge-100">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">7-Day</div>
                <div className="text-ge-100">Money Back</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
