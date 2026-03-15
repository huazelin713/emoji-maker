import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  const enhancedPrompt = `TOK emoji of ${prompt.trim()}, white background, simple, clean, cartoon style`
  const encodedPrompt = encodeURIComponent(enhancedPrompt)
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&seed=${Date.now()}`

  return NextResponse.json({ url: imageUrl })
}
