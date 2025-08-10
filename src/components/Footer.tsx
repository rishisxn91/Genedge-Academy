import Link from 'next/link'
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container">
        <div className="section">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-ge-600 to-ge-700 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">GenEdge Academy</span>
              </div>
              <p className="text-gray-300 text-lg mb-6 max-w-md">
                India&apos;s premier AI learning platform. Master AI skills at your own pace and unlock new opportunities in the digital age.
              </p>
              <div className="flex space-x-4">
                <Link href="/catalog" className="btn-primary">
                  Browse Courses
                </Link>
                <Link href="/pricing" className="btn-outline border-white text-white hover:bg-white hover:text-gray-900">
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/catalog" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Course Catalog
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-gray-300 hover:text-white transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Student Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal & Contact</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@genedge.ac" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>contact@genedge.ac</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} GenEdge Academy. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made in India 🇮🇳</span>
              <span>100% Self-Paced Learning</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
