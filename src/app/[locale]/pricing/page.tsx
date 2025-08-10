'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Star, Users, Clock, Globe, Zap } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Starter',
    price: 999,
    description: 'Perfect for beginners starting their AI journey',
    features: [
      'Access to 3 courses',
      'Basic prompt engineering',
      'Community support',
      'Certificate of completion',
      '30-day money-back guarantee'
    ],
    popular: false,
    icon: Users
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
      'Career guidance',
      'Lifetime access',
      '30-day money-back guarantee'
    ],
    popular: true,
    icon: Star
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
      'API access',
      'White-label options',
      '30-day money-back guarantee'
    ],
    popular: false,
    icon: Globe
  }
]

const features = [
  {
    icon: Clock,
    title: 'Self-Paced Learning',
    description: 'Learn at your own speed with no pressure or deadlines'
  },
  {
    icon: Zap,
    title: 'Practical Projects',
    description: 'Apply your knowledge with real-world AI projects'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with fellow learners and AI enthusiasts'
  },
  {
    icon: Star,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals and AI experts'
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const getPrice = (basePrice: number) => {
    if (billingCycle === 'yearly') {
      return Math.round(basePrice * 0.8) // 20% discount for yearly
    }
    return basePrice
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ge-600 to-ge-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-ge-100 max-w-3xl mx-auto mb-8">
            Transparent pricing with no hidden fees. All plans include lifetime access and our 30-day money-back guarantee.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-ge-200'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-ge-500 transition-colors focus:outline-none focus:ring-2 focus:ring-ge-400 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-ge-200'}`}>
              Yearly
              {billingCycle === 'yearly' && (
                <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Save 20%
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-ge-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-ge-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-ge-500 to-ge-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ₹{getPrice(plan.price).toLocaleString()}
                </div>
                <div className="text-gray-500">
                  {billingCycle === 'yearly' ? 'per year' : 'one-time'}
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-sm text-green-600 mt-1">
                    Save ₹{(plan.price * 0.2).toLocaleString()}
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/catalog"
                className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-ge-600 text-white hover:bg-ge-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose GenEdge Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to provide the best learning experience for AI enthusiasts and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-ge-500 to-ge-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the course access?
              </h3>
              <p className="text-gray-600">
                You get lifetime access to all course content, including video lectures, downloadable resources, and community support.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I get a refund if I'm not satisfied?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact us for a full refund.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do I need any prior experience with AI?
              </h3>
              <p className="text-gray-600">
                No prior experience is required. Our courses are designed to take you from beginner to advanced levels.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long do I have access to the courses?
              </h3>
              <p className="text-gray-600">
                You have lifetime access to all courses you purchase. There are no time limits or expiration dates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-ge-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-xl text-ge-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already mastering AI skills with GenEdge Academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="bg-white text-ge-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              href="/auth/signup"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-ge-600 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
