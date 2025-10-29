// app/blogs/page.tsx

import Link from 'next/link'
// 1. Import your Amplify client
import { client } from '../index'
// 2. Import unstable_cache from next/cache
import { unstable_cache } from 'next/cache'

// 3. Define your data-fetching logic wrapped in unstable_cache
// This creates a new, cached version of your function.
const getCachedBlogPosts = unstable_cache(
  // The async function to cache
  async () => {
    // This is the same logic you had in your 'try' block
    if (!client || !client.models || !client.models.Blog) {
      throw new Error('Data client not available');
    }

    const res: any = await client.models.Blog.list();

    // Normalization logic
    if (Array.isArray(res)) return res;
    if (res?.data && Array.isArray(res.data)) return res.data;
    if (res?.items && Array.isArray(res.items)) return res.items;
    
    return []; // Default to empty array if no data is found
  },
  // 4. A unique cache key for this specific query
  // This tells Next.js how to identify this piece of cached data.
  ['all-blog-posts'],
  // 5. Cache options
  {
    // Revalidate the cache at most every 60 seconds.
    // You can change this value to fit your needs (e.g., 3600 for 1 hour).
    revalidate: 86400,
    
    // Optionally, you can add tags for on-demand revalidation
    // tags: ['blogs'],
  }
);


export default async function Page() {
  let allPosts: any[] = []
  
  try {
    // 6. Call your new *cached* function instead of the direct client
    // Next.js will return the cached data if it's fresh,
    // or run the function, cache the result, and return it.
    allPosts = await getCachedBlogPosts();

  } catch (err: any) {
    // 7. This catch block now handles errors from the cache or the db function
    console.error('Failed to fetch posts:', err);
    allPosts = []
  }

  // 8. The rest of your page component's JSX remains the same
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-extrabold">Blogs</h1>
        <p className="mt-2 text-gray-600">Latest posts from the Roomies community</p>
      </header>

      {allPosts.length === 0 ? (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
          <p className="text-gray-600">No posts yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post: any) => {
            const published = post.postedDate ? new Date(post.postedDate) : null
            const date = published ? published.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : null
            const thumb = post.thumbnail || post.image || null
            // Fix: Check for string before slicing
            let excerpt = '';
            const contentString = post.summary || post.content || '';
            if (typeof contentString === 'string') {
              excerpt = contentString.slice(0, 140);
            }

            return (
              <article key={post.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                {thumb ? (
                  <div className="h-40 overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                ) : null}

                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <Link href={`/blogs/${post.id}`} className="text-lg font-semibold hover:underline">{post.title ?? post.name ?? '(untitled)'}</Link>
                    {date ? <time className="text-xs text-gray-500">{date}</time> : null}
                  </div>

                  <p className="text-sm text-gray-700 mt-3 mb-4">{excerpt}{(typeof contentString === 'string' && contentString.length > 140) ? '…' : ''}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">By {post.author ?? 'Unknown'}</p>
                    <Link href={`/blogs/${post.id}`} className="text-sm font-medium text-blue-600 hover:underline">Read →</Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
