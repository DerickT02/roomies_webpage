import { NextResponse } from 'next/server';
import { client } from '../../index';
import { promises as fs } from 'fs';
import path from 'path';

type Body = {
  title?: unknown;
  url?: unknown;
  content?: unknown;
  author?: unknown;
  summary?: unknown;
  delta?: unknown;
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
  if (!isString(body.content) || body.content.trim().length < 10) {
    return 'Content is required and must be at least 10 characters.';
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
  const content = (body.content as string).trim();
  const delta = body.delta ?? null;
    const author = (body.author as string).trim();
    const summary = isString(body.summary) ? (body.summary as string).trim().slice(0, 500) : '';
    const categories = isString(body.categories) ? (body.categories as string).split(',').map(s => s.trim()).filter(Boolean) : [];

    const d: any = {
      id: `local-${Date.now()}`,
      title,
      url,
      content,
      delta,
      author,
      postedDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      summary,
      categories,
    };

    // helper: write to local JSON file
    const writeLocalBlog = async (obj: any) => {
      const dataDir = path.resolve(process.cwd(), '.data');
      const file = path.join(dataDir, 'blogs.json');
      await fs.mkdir(dataDir, { recursive: true });
      let list: any[] = [];
      try {
        const raw = await fs.readFile(file, 'utf8');
        list = JSON.parse(raw || '[]');
      } catch (e) {
        list = [];
      }
      list.push(obj);
      await fs.writeFile(file, JSON.stringify(list, null, 2), 'utf8');
      return obj;
    };

    // Try Amplify first; if anything goes wrong, fall back to local storage
    try {
      if (!client || !client.models || !client.models.Blog || typeof client.models.Blog.create !== 'function') {
        throw new Error('Amplify client or Blog model not available');
      }

      // If the model expects a plain string for delta, serialize it; otherwise adjust as needed.
      const payloadForAmplify: any = {
        title,
        url,
        content,
        author,
        postedDate: d.postedDate,
        updateDate: d.updateDate,
        summary,
      };
      if (delta) {
        try {
          payloadForAmplify.delta = typeof delta === 'string' ? delta : JSON.stringify(delta);
        } catch (e) {
          payloadForAmplify.delta = String(delta);
        }
      }

      const { data, errors } = await client.models.Blog.create(payloadForAmplify);

      if (errors && errors.length > 0) {
        throw new Error('Amplify Data client returned errors: ' + JSON.stringify(errors));
      }

      return NextResponse.json({ data }, { status: 201 });
    } catch (amplifyErr: any) {
      // fallback to local write
      try {
        const local = await writeLocalBlog(d);
        return NextResponse.json({ data: local, local: true, amplifyError: String(amplifyErr) }, { status: 201 });
      } catch (errLocal: any) {
        return NextResponse.json({ error: 'Local write failed', details: String(errLocal), amplifyError: String(amplifyErr) }, { status: 500 });
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
