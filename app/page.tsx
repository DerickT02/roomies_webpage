import Nav from "./components/nav";
import Footer from "./components/footer";
import { subscribe } from './actions/actions';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Keep existing navigation */}
      <Nav />

      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-2xl text-center">
          <span className="inline-block mb-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm border border-purple-200">
            Join our early access list
          </span>


          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get the inside scoop on Roomies
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            We’re building tools to make finding a compatible roommate fast,
            safe, and simple. Leave your email and we'll send launch updates,
            exclusive offers, and early access invitations.
          </p>

          <form
            action={subscribe}
            className="mx-auto max-w-xl"
            aria-label="Subscribe to Roomies updates"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-required="true"
              />

              <button
                type="submit"
                className="h-12 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Join the list
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              By signing up you agree to receive periodic emails. We respect
              your privacy — your email will never be sold. Unsubscribe at any
              time.
            </p>
          </form>

          <div className="mt-10 text-left text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-2">Why sign up?</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Early access invitations and priority onboarding</li>
              <li>Exclusive launch discounts and promotions</li>
              <li>Practical roommate tips and expert interviews</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Keep existing footer */}
      <Footer />
    </div>
  );
}
