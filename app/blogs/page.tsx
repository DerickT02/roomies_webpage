import Link from 'next/link'
export default async function Page() {
  // Fetch blog list from internal API and normalize into an array
  let allPosts: any[] = []
  try {
    const res = await fetch(`${process.env.URL}api/blog`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      console.log('Fetched /api/blog:', json)
      // Normalize common shapes: raw array, { data: [...] }, { ok: true, data: [...] }
      if (Array.isArray(json)) allPosts = json
      else if (Array.isArray(json?.data)) allPosts = json.data
      else if (Array.isArray(json?.data?.data)) allPosts = json.data.data
      else allPosts = []
    } else {
      allPosts = []
    }
  } catch (err) {
    console.error('Failed to fetch /api/blog:', err)
    allPosts = []
  }

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
            const excerpt = (post.summary || post.content || '').slice(0, 140)

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
                    <Link href={`/blogs/${post.url}`} className="text-lg font-semibold hover:underline">{post.title ?? post.name ?? '(untitled)'}</Link>
                    {date ? <time className="text-xs text-gray-500">{date}</time> : null}
                  </div>

                  <p className="text-sm text-gray-700 mt-3 mb-4">{excerpt}{(post.summary || post.content || '').length > 140 ? '…' : ''}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">By {post.author ?? 'Unknown'}</p>
                    <Link href={`/blogs/${post.url}`} className="text-sm font-medium text-blue-600 hover:underline">Read →</Link>
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
