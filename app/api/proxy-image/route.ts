import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url || !url.startsWith('https://image.pollinations.ai/')) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  const res = await fetch(url)
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 })
  }

  const buffer = await res.arrayBuffer()
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': res.headers.get('content-type') || 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
