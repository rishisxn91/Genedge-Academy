export const PRICING_CONFIG = {
  professional: {
    price: 2999, // ₹2,999
    pricePaise: 299900,
    originalPrice: 5999, // ₹5,999
    originalPricePaise: 599900,
    savings: 3000, // ₹3,000
    savingsPercentage: 50,
    currency: 'INR',
    currencySymbol: '₹'
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

export const getSavingsAmount = (): string => {
  return `${PRICING_CONFIG.currencySymbol}${PRICING_CONFIG.professional.savings.toLocaleString('en-IN')}`
}

export const getSavingsPercentage = (): string => {
  return `${PRICING_CONFIG.professional.savingsPercentage}%`
}
