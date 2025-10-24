import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="text-2xl font-bold text-cyan-800">Roomies</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="#safety"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Safety
          </Link>
          <Link
            href="#podcast"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Podcast
          </Link>
          <Link
            href="/blogs"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Link href="#">Sign In</Link>
          </button>
          <button className="px-6 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2">
            <Link href="#">Get Started</Link>
          </button>
        </div>
      </div>
    </header>
  );
}
