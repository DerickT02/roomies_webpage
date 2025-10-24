"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BlogForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [contentHtml, setContentHtml] = useState('');
  const [contentDelta, setContentDelta] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: any = {
      title: (fd.get('title') as string) || '',
      url: (fd.get('url') as string) || '',
      author: (fd.get('author') as string) || '',
      content: contentHtml || '',
      delta: contentDelta || null,
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
      setContentHtml('');
      setContentDelta(null);
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
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <ReactQuill
          theme="snow"
          value={contentHtml}
          onChange={(html: string, delta: any, source: any, editor: any) => {
            setContentHtml(html);
            try {
              setContentDelta(editor.getContents());
            } catch (e) {
              setContentDelta(null);
            }
          }}
          modules={{
            toolbar: [
              [{ 'header': [2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'align': [] }],
              ['blockquote', 'code-block'],
              ['link', 'image', 'video'],
              ['clean']
            ]
          }}
          formats={[
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike',
            'color', 'background',
            'script',
            'list', 'bullet', 'indent',
            'align',
            'blockquote', 'code-block',
            'link', 'image', 'video'
          ]}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button type="submit" disabled={loading} className="px-3 py-1 bg-cyan-800 text-white rounded">{loading ? 'Saving...' : 'Create'}</button>
        <span className="text-xs text-gray-500">Server-side validation will run.</span>
      </div>
    </form>
  );
}
