export const PRICING_CONFIG = {
  // Individual course pricing
  courses: {
    aiEssentials: {
      price: 2999, // ₹2,999
      pricePaise: 299900,
      originalPrice: 3499, // ₹3,499
      originalPricePaise: 349900,
      savings: 500, // ₹500
      savingsPercentage: 14,
      duration: '5 hours',
      level: 'Beginner'
    },
    aiMarketing: {
      price: 4999, // ₹4,999
      pricePaise: 499900,
      originalPrice: 5999, // ₹5,999
      originalPricePaise: 599900,
      savings: 1000, // ₹1,000
      savingsPercentage: 17,
      duration: '7 hours',
      level: 'Intermediate'
    },
    appliedML: {
      price: 7999, // ₹7,999
      pricePaise: 799900,
      originalPrice: 9999, // ₹9,999
      originalPricePaise: 999900,
      savings: 2000, // ₹2,000
      savingsPercentage: 20,
      duration: '20 hours',
      level: 'Advanced'
    },
    aiProductivity: {
      price: 2499, // ₹2,499
      pricePaise: 249900,
      originalPrice: 2999, // ₹2,999
      originalPricePaise: 299900,
      savings: 500, // ₹500
      savingsPercentage: 17,
      duration: '4 hours',
      level: 'Beginner'
    },
    responsibleAI: {
      price: 1999, // ₹1,999
      pricePaise: 199900,
      originalPrice: 1999, // ₹1,999
      originalPricePaise: 199900,
      savings: 0, // No savings
      savingsPercentage: 0,
      duration: '3 hours',
      level: 'Intermediate'
    }
  },
  // Membership pricing
  membership: {
    price: 8999, // ₹8,999/year
    pricePaise: 899900,
    originalPrice: 14999, // ₹14,999
    originalPricePaise: 14999900,
    savings: 6000, // ₹6,000
    savingsPercentage: 40,
    duration: '1 year',
    description: 'Unlimited access to all courses + quarterly AI updates'
  },
  refundWindow: 30, // days
  contactEmail: 'support@genedgeacademy.com',
  currencySymbol: '₹',
  scarcity: {
    enabled: process.env.NEXT_PUBLIC_SCARCITY_ENABLED === 'true',
    seatsLeft: parseInt(process.env.NEXT_PUBLIC_SEATS_LEFT || '0'),
    countdownEnd: process.env.NEXT_PUBLIC_COUNTDOWN_END || null
  }
}

export const formatPrice = (pricePaise: number): string => {
  const price = pricePaise / 100
  return `${PRICING_CONFIG.currencySymbol}${price.toLocaleString('en-IN')}`
}

export const formatOriginalPrice = (pricePaise: number): string => {
  const price = pricePaise / 100
  return `${PRICING_CONFIG.currencySymbol}${price.toLocaleString('en-IN')}`
}

export const getSavingsAmount = (courseKey?: string): string => {
  if (courseKey && PRICING_CONFIG.courses[courseKey as keyof typeof PRICING_CONFIG.courses]) {
    const course = PRICING_CONFIG.courses[courseKey as keyof typeof PRICING_CONFIG.courses]
    return `${PRICING_CONFIG.currencySymbol}${course.savings.toLocaleString('en-IN')}`
  }
  // Default to membership savings
  return `${PRICING_CONFIG.currencySymbol}${PRICING_CONFIG.membership.savings.toLocaleString('en-IN')}`
}

export const getSavingsPercentage = (courseKey?: string): string => {
  if (courseKey && PRICING_CONFIG.courses[courseKey as keyof typeof PRICING_CONFIG.courses]) {
    const course = PRICING_CONFIG.courses[courseKey as keyof typeof PRICING_CONFIG.courses]
    return `${course.savingsPercentage}%`
  }
  // Default to membership savings
  return `${PRICING_CONFIG.membership.savingsPercentage}%`
}
