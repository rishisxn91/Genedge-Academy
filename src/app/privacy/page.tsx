export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ge-600 to-ge-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="heading-1 mb-4">Privacy Policy</h1>
          <p className="text-xl text-ge-100 max-w-2xl mx-auto">
            How we collect, use, and protect your personal information
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
                <h2 className="heading-2 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  GenEdge Academy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online learning platform.
                </p>
                <p className="text-gray-700 mb-4">
                  By using our service, you consent to the data practices described in this policy. If you do not agree with our policies and practices, please do not use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">2. Information We Collect</h2>
                
                <h3 className="heading-3 mb-3">2.1 Personal Information</h3>
                <p className="text-gray-700 mb-4">
                  We may collect personal information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Account credentials and profile information</li>
                  <li>Payment and billing information</li>
                  <li>Educational background and preferences</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="heading-3 mb-3">2.2 Usage Information</h3>
                <p className="text-gray-700 mb-4">
                  We automatically collect certain information about your use of our platform:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Course progress and completion data</li>
                  <li>Learning preferences and behavior patterns</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h3 className="heading-3 mb-3">2.3 Third-Party Information</h3>
                <p className="text-gray-700 mb-4">
                  We may receive information from third-party sources, such as:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Payment processors (Razorpay)</li>
                  <li>Analytics services (Google Analytics)</li>
                  <li>Social media platforms</li>
                  <li>Educational partners and affiliates</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Providing and maintaining our educational services</li>
                  <li>Processing payments and managing subscriptions</li>
                  <li>Personalizing your learning experience</li>
                  <li>Tracking progress and providing analytics</li>
                  <li>Communicating with you about courses and updates</li>
                  <li>Improving our platform and services</li>
                  <li>Ensuring security and preventing fraud</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">4. Information Sharing and Disclosure</h2>
                
                <h3 className="heading-3 mb-3">4.1 We Do Not Sell Your Data</h3>
                <p className="text-gray-700 mb-4">
                  We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                </p>

                <h3 className="heading-3 mb-3">4.2 Service Providers</h3>
                <p className="text-gray-700 mb-4">
                  We may share your information with trusted service providers who assist us in operating our platform:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Cloud hosting and storage providers</li>
                  <li>Payment processing services</li>
                  <li>Email and communication services</li>
                  <li>Analytics and monitoring tools</li>
                  <li>Customer support platforms</li>
                </ul>

                <h3 className="heading-3 mb-3">4.3 Legal Requirements</h3>
                <p className="text-gray-700 mb-4">
                  We may disclose your information if required by law or in response to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Valid legal requests from government authorities</li>
                  <li>Court orders or legal proceedings</li>
                  <li>Protection of our rights and property</li>
                  <li>Emergency situations involving public safety</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">5. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure data centers and infrastructure</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">6. Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our services</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">7. Your Rights and Choices</h2>
                
                <h3 className="heading-3 mb-3">7.1 Access and Control</h3>
                <p className="text-gray-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Access and review your personal information</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of marketing communications</li>
                </ul>

                <h3 className="heading-3 mb-3">7.2 Cookies and Tracking</h3>
                <p className="text-gray-700 mb-4">
                  You can control cookies and tracking technologies through your browser settings. However, disabling certain cookies may affect the functionality of our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">8. International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">10. Changes to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Posting the updated policy on our platform</li>
                  <li>Sending you an email notification</li>
                  <li>Displaying a prominent notice on our website</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Your continued use of our service after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">11. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Data Protection Officer:</strong><br />
                    <strong>Email:</strong> privacy@genedge-academy.com<br />
                    <strong>Address:</strong> GenEdge Academy, Mumbai, Maharashtra, India<br />
                    <strong>Phone:</strong> +91-22-1234-5678
                  </p>
                </div>
              </section>

              <div className="border-t border-gray-200 pt-8 mt-12">
                <p className="text-sm text-gray-500 text-center">
                  This Privacy Policy is effective as of the date listed above and applies to all users of GenEdge Academy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
