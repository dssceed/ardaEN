import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import path from 'path';

// Serve files from public/uploads at request time.
//
// Next.js only serves files that exist in `public/` at build time. Files
// uploaded after `next build` (via the admin upload API) are NOT served by the
// static handler in production, so they 404 until a rebuild. This route reads
// the file from disk on each request, so new uploads are available immediately.

export const dynamic = 'force-dynamic';

const UPLOADS_ROOT = path.join(process.cwd(), 'public', 'uploads');

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  // Resolve the requested path and confirm it stays inside UPLOADS_ROOT
  // (guards against `..` traversal).
  const filepath = path.join(UPLOADS_ROOT, ...segments);
  const normalized = path.normalize(filepath);
  if (normalized !== UPLOADS_ROOT && !normalized.startsWith(UPLOADS_ROOT + path.sep)) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const fileStat = await stat(normalized);
    if (!fileStat.isFile()) {
      return new NextResponse('Not found', { status: 404 });
    }

    const data = await readFile(normalized);
    const ext = path.extname(normalized).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(fileStat.size),
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
