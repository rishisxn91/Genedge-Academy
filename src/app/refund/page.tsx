export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ge-600 to-ge-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="heading-1 mb-4">Refund Policy</h1>
          <p className="text-xl text-ge-100 max-w-2xl mx-auto">
            Our commitment to your satisfaction with our learning platform
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">1. Overview</h2>
                <p className="text-gray-700 mb-4">
                  At GenEdge Academy, we are committed to providing high-quality educational content and an exceptional learning experience. We understand that sometimes a course or subscription may not meet your expectations, and we want to ensure your satisfaction.
                </p>
                <p className="text-gray-700 mb-4">
                  This refund policy outlines the terms and conditions under which refunds may be granted for our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">2. 30-Day Money-Back Guarantee</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="heading-3 text-green-800 mb-3">Our Promise to You</h3>
                  <p className="text-green-700">
                    We offer a 30-day money-back guarantee for all new subscriptions and course purchases. If you're not completely satisfied with your learning experience within the first 30 days, we'll provide a full refund.
                  </p>
                </div>
                
                <h3 className="heading-3 mb-3">2.1 Eligibility Requirements</h3>
                <p className="text-gray-700 mb-4">
                  To be eligible for a refund under our 30-day guarantee:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Your request must be submitted within 30 days of your initial purchase</li>
                  <li>You must not have completed more than 25% of any course content</li>
                  <li>You must not have downloaded or accessed premium resources</li>
                  <li>Your account must be in good standing with no violations of our terms</li>
                </ul>

                <h3 className="heading-3 mb-3">2.2 What's Covered</h3>
                <p className="text-gray-700 mb-4">
                  The 30-day guarantee covers:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Monthly and annual subscription plans</li>
                  <li>Individual course purchases</li>
                  <li>Course bundles and learning paths</li>
                  <li>Premium features and add-ons</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">3. Refund Process</h2>
                
                <h3 className="heading-3 mb-3">3.1 How to Request a Refund</h3>
                <p className="text-gray-700 mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Log into your GenEdge Academy account</li>
                  <li>Go to the "Support" or "Help" section</li>
                  <li>Submit a refund request with your order details</li>
                  <li>Provide a brief explanation for your refund request</li>
                  <li>Wait for our team to review your request (typically 2-3 business days)</li>
                </ol>

                <h3 className="heading-3 mb-3">3.2 Required Information</h3>
                <p className="text-gray-700 mb-4">
                  When submitting your refund request, please include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Your full name and email address</li>
                  <li>Order number or transaction ID</li>
                  <li>Date of purchase</li>
                  <li>Reason for the refund request</li>
                  <li>Any additional context that may help us understand your situation</li>
                </ul>

                <h3 className="heading-3 mb-3">3.3 Review and Processing</h3>
                <p className="text-gray-700 mb-4">
                  Our customer support team will review your refund request within 2-3 business days. We may contact you for additional information if needed.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">4. Refund Methods and Timeline</h2>
                
                <h3 className="heading-3 mb-3">4.1 Refund Methods</h3>
                <p className="text-gray-700 mb-4">
                  Refunds will be processed using the same payment method used for the original purchase:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li><strong>Credit/Debit Cards:</strong> Refunded to the original card (5-10 business days)</li>
                  <li><strong>Digital Wallets:</strong> Refunded to the original wallet (2-5 business days)</li>
                  <li><strong>Bank Transfers:</strong> Refunded to the original bank account (7-14 business days)</li>
                  <li><strong>UPI:</strong> Refunded to the original UPI ID (2-5 business days)</li>
                </ul>

                <h3 className="heading-3 mb-3">4.2 Processing Timeline</h3>
                <p className="text-gray-700 mb-4">
                  Once your refund is approved:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Refund processing begins immediately</li>
                  <li>You'll receive an email confirmation</li>
                  <li>Funds typically appear in your account within 5-14 business days</li>
                  <li>Processing time may vary depending on your bank or payment provider</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">5. Exceptions and Limitations</h2>
                
                <h3 className="heading-3 mb-3">5.1 Non-Refundable Items</h3>
                <p className="text-gray-700 mb-4">
                  The following items are not eligible for refunds:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Courses completed beyond 25%</li>
                  <li>Downloaded premium resources and materials</li>
                  <li>One-on-one mentoring sessions that have been conducted</li>
                  <li>Custom learning paths that have been created</li>
                  <li>Enterprise plans after the first 30 days</li>
                </ul>

                <h3 className="heading-3 mb-3">5.2 Circumstances Where Refunds May Be Denied</h3>
                <p className="text-gray-700 mb-4">
                  Refunds may be denied in the following cases:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Violation of our Terms of Service</li>
                  <li>Fraudulent activity or abuse of our refund policy</li>
                  <li>Multiple refund requests for the same content</li>
                  <li>Sharing account credentials with unauthorized users</li>
                  <li>Attempting to circumvent our payment systems</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">6. Special Circumstances</h2>
                
                <h3 className="heading-3 mb-3">6.1 Technical Issues</h3>
                <p className="text-gray-700 mb-4">
                  If you experience technical difficulties that prevent you from accessing our platform, we'll work with you to resolve the issue. If the problem cannot be resolved within a reasonable time, we may offer a refund or credit.
                </p>

                <h3 className="heading-3 mb-3">6.2 Course Quality Issues</h3>
                <p className="text-gray-700 mb-4">
                  If you believe a course doesn't meet the quality standards advertised, please contact our support team. We take quality seriously and will investigate any legitimate concerns.
                </p>

                <h3 className="heading-3 mb-3">6.3 Subscription Cancellations</h3>
                <p className="text-gray-700 mb-4">
                  You can cancel your subscription at any time. Cancellations take effect at the end of your current billing period, and no refunds are provided for unused portions of the current period.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">7. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For refund requests or questions about this policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Customer Support:</strong><br />
                    <strong>Email:</strong> support@genedge-academy.com<br />
                    <strong>Refund Requests:</strong> refunds@genedge-academy.com<br />
                    <strong>Phone:</strong> +91-22-1234-5678<br />
                    <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">8. Policy Updates</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to update this refund policy at any time. Changes will be effective immediately upon posting on our website. We encourage you to review this policy periodically.
                </p>
              </section>

              <div className="border-t border-gray-200 pt-8 mt-12">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="heading-3 text-blue-800 mb-3">Our Commitment</h3>
                  <p className="text-blue-700">
                    At GenEdge Academy, we're committed to your learning success. If you're not satisfied with your experience, we want to hear from you. Our team is here to help ensure you get the most value from our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
