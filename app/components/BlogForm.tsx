"use client";
import { useState } from 'react';

export default function BlogForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      title: (fd.get('title') as string) || '',
      url: (fd.get('url') as string) || '',
      author: (fd.get('author') as string) || '',
      content: fd.get('content') || '',
      summary: (fd.get('summary') as string) || '',
      categories: (fd.get('categories') as string) || '',
    };

    // basic client-side validation
    if (payload.title.trim().length < 3) return setError('Title must be at least 3 characters');
    if (payload.url.trim().length < 3) return setError('URL must be at least 3 characters');
    if (payload.author.trim().length < 1) return setError('Author is required');

    setLoading(true);
    try {
      const res = await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'Unknown error');
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Blog created successfully.</div>}
      <input name="title" placeholder="Title" className="w-full rounded-md border-gray-200 px-2 py-1" />
      <input name="url" placeholder="URL (slug)" className="w-full rounded-md border-gray-200 px-2 py-1" />
      <input name="author" placeholder="Author" className="w-full rounded-md border-gray-200 px-2 py-1" />
  <input name="categories" placeholder="Categories (comma separated)" className="w-full rounded-md border-gray-200 px-2 py-1" />
      <textarea name="summary" placeholder="Short summary (optional)" rows={2} className="w-full rounded-md border-gray-200 px-2 py-1"></textarea>
      <textarea name="content" placeholder="Blog content" rows={6} className="w-full rounded-md border-gray-200 px-2 py-1"></textarea>
      <div className="flex items-center gap-2">
        <button type="submit" disabled={loading} className="px-3 py-1 bg-cyan-800 text-white rounded">{loading ? 'Saving...' : 'Create'}</button>
        <span className="text-xs text-gray-500">Server-side validation will run.</span>
      </div>
    </form>
  );
}
