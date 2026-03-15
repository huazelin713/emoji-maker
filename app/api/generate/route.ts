import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  const apiKey = process.env.SILICONFLOW_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API not configured' }, { status: 500 })
  }

  const enhancedPrompt = `emoji sticker of ${prompt.trim()}, white background, simple, clean, cartoon style, flat design, cute`

  try {
    const res = await fetch('https://api.siliconflow.cn/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'black-forest-labs/FLUX.1-schnell',
        prompt: enhancedPrompt,
        image_size: '512x512',
        num_inference_steps: 4,
        batch_size: 1,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('SiliconFlow error:', res.status, err)
      return NextResponse.json({ error: 'Generation failed, please try again' }, { status: 500 })
    }

    const data = await res.json()
    const imageUrl = data?.images?.[0]?.url

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image returned, please try again' }, { status: 500 })
    }

    // Fetch image and return as base64 to avoid CORS issues on frontend
    const imgRes = await fetch(imageUrl)
    const buffer = await imgRes.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const contentType = imgRes.headers.get('content-type') || 'image/png'

    return NextResponse.json({ url: `data:${contentType};base64,${base64}` })
  } catch (e) {
    console.error('Generate error:', e)
    return NextResponse.json({ error: 'Service unavailable, please try again' }, { status: 503 })
  }
}
