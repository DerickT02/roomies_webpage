import { NextResponse } from 'next/server';
import { client } from '../../index';

type Body = {
  title?: unknown;
  url?: unknown;
  content?: unknown;
  author?: unknown;
  summary?: unknown;
  categories?: unknown;
};

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function validateBody(body: Body) {
  if (!isString(body.title) || body.title.trim().length < 3) {
    return 'Title is required and must be at least 3 characters.';
  }
  if (!isString(body.url) || body.url.trim().length < 3) {
    return 'URL is required and must be at least 3 characters.';
  }
  if (!isString(body.author) || body.author.trim().length < 1) {
    return 'Author is required.';
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const err = validateBody(body);
    if (err) return NextResponse.json({ error: err }, { status: 400 });

    const title = (body.title as string).trim();
    const url = (body.url as string).trim();
    const content = body.content
    const author = (body.author as string).trim();
    const summary = isString(body.summary) ? (body.summary as string).trim().slice(0, 500) : '';
    const categories = isString(body.categories) ? (body.categories as string).split(',').map(s => s.trim()).filter(Boolean) : [];

    const { data, errors } = await client.models.Blog.create({
      title,
      url,
      content,
      author,
      postedDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      summary,
    });

    if (errors && errors.length > 0) {
      return NextResponse.json({ error: 'Failed to create blog', details: errors }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
