import Nav from "../components/nav";
import Footer from "../components/footer";
import BlogForm from "../components/BlogForm";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="flex-1 py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-4">
            <a href="/" className="text-sm text-cyan-700 hover:underline">← Back to home</a>
          </div>
          <h1 className="text-3xl font-semibold mb-6">Create a Blog Post</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <BlogForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
