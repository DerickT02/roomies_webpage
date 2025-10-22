import Link from "next/link";
const date = new Date();

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏠</span>
              <span className="text-xl font-bold text-cyan-800">Roomies</span>
            </div>
            <p className="text-gray-600 text-sm">
              Making roommate matching simple, safe, and successful.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-gray-900 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#safety"
                  className="hover:text-gray-900 transition-colors"
                >
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {date.getFullYear()} Roomies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
