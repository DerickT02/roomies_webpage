import { client } from '../../index'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
// 1. Import unstable_cache from next/cache
import { unstable_cache } from 'next/cache';

export async function generateStaticParams() {
  // Fetch all blog posts to generate their paths
  const res: any = await client.models.Blog.list();
  let allPosts: any[] = [];

  if (Array.isArray(res)) allPosts = res;
  else if (res?.data && Array.isArray(res.data)) allPosts = res.data;
  else if (res?.items && Array.isArray(res.items)) allPosts = res.items;
  console.log("All Posts for static params:", allPosts);
  return allPosts.map((post) => ({
    id: post.id,
  }));
}   

// 2. Define your data-fetching logic wrapped in unstable_cache
const getCachedBlogPost = unstable_cache(
  // The async function to cache
  async (id: string) => {
    if (!client || !client.models || !client.models.Blog) {
      throw new Error('Data client not available');
    }
    // Fetch the single post
    const res: any = await client.models.Blog.get({ id: id });
    
    // Return the data object directly, or null if not found
    return res.data || null;
  },
  // 3. A dynamic cache key that includes the post ID
  // This ensures each post is cached individually.
  ['blog-post'], 
  // 4. Cache options (same as the list page)
  {
    revalidate: 60,
    // Optionally, you can add tags for on-demand revalidation
    // tags: ['blog-post'],
  }
);


export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  let parsedContent: any;
  let postTitle: string = "Loading...";

  try {
    // 5. Call your new *cached* function with the ID
    const postData = await getCachedBlogPost(id);

    // 6. Process the data from the cached function
    if (postData) {
      postTitle = postData.title || id; 
      let unparsedContent = postData.content;
      let delta = JSON.parse(unparsedContent);
      const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      parsedContent = converter.convert();
    } else {
      // Handle case where post is not found
      postTitle = "Post not found";
      parsedContent = "<p>This post could not be found.</p>";
    }
    
  } catch (err: any) {
    // 7. The catch block now handles errors from the cache or the db function
    console.error('Failed to fetch post from database:', err);
    postTitle = "Post not found";
    parsedContent = "<p>There was an error loading this post.</p>";
  }

  // 8. Your JSX remains the same
  return (
    <div>
      <h1>{postTitle}</h1>

      {/* This div will render your parsed HTML content */}
      <div 
        dangerouslySetInnerHTML={{ __html: parsedContent }} 
      />
    </div>
  );
}
