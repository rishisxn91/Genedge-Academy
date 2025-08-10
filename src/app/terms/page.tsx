export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ge-600 to-ge-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="heading-1 mb-4">Terms of Service</h1>
          <p className="text-xl text-ge-100 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform
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
                <h2 className="heading-2 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using GenEdge Academy ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  GenEdge Academy provides online educational content, courses, and learning materials. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">3. User Accounts</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    To access certain features of the Platform, you must create an account. You are responsible for:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Providing accurate and complete information</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">4. Course Content and Intellectual Property</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    All content on the Platform, including but not limited to courses, videos, text, graphics, and software, is the property of GenEdge Academy or its content providers and is protected by copyright laws.
                  </p>
                  <p className="text-gray-700">
                    You may not:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Copy, reproduce, distribute, or create derivative works</li>
                    <li>Share your account credentials with others</li>
                    <li>Record or download course content</li>
                    <li>Use content for commercial purposes without permission</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">5. Payment Terms</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Subscription fees are billed in advance on a monthly or annual basis. All payments are non-refundable except as provided in our refund policy.
                  </p>
                  <p className="text-gray-700">
                    We reserve the right to change our pricing with 30 days notice. Price changes will not affect existing subscriptions until renewal.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">6. User Conduct</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    You agree not to use the Platform to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on the rights of others</li>
                    <li>Upload malicious code or content</li>
                    <li>Interfere with the Platform's operation</li>
                    <li>Harass, abuse, or harm other users</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">7. Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Platform, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">8. Disclaimers</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    The Platform is provided "as is" without warranties of any kind. We do not guarantee:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Uninterrupted or error-free service</li>
                    <li>Accuracy of course content</li>
                    <li>Employment or career outcomes</li>
                    <li>Compatibility with all devices or browsers</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  In no event shall GenEdge Academy be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">10. Termination</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We may terminate or suspend your account and access to the Platform at any time, with or without cause, with or without notice.
                  </p>
                  <p className="text-gray-700">
                    Upon termination, your right to use the Platform will cease immediately, and you will lose access to all course content and features.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">11. Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Platform. Your continued use of the Platform after such modifications constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">13. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@genedge-academy.com<br />
                    <strong>Address:</strong> GenEdge Academy, Mumbai, Maharashtra, India<br />
                    <strong>Phone:</strong> +91-22-1234-5678
                  </p>
                </div>
              </section>

              <div className="border-t border-gray-200 pt-8 mt-12">
                <p className="text-sm text-gray-500 text-center">
                  By using GenEdge Academy, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
