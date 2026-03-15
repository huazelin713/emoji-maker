import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  const apiKey = process.env.REPLICATE_API_TOKEN
  if (!apiKey) {
    return NextResponse.json({ error: 'API not configured' }, { status: 500 })
  }

  // Start prediction
  const startRes = await fetch(
    'https://api.replicate.com/v1/models/fofr/sdxl-emoji/predictions',
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          prompt: `TOK emoji of ${prompt.trim()}, white background, simple, clean`,
          negative_prompt: 'realistic, photo, complex background, text',
          num_outputs: 1,
          width: 512,
          height: 512,
        },
      }),
    }
  )

  if (!startRes.ok) {
    return NextResponse.json({ error: 'Failed to start generation' }, { status: 500 })
  }

  const prediction = await startRes.json()

  // Poll for result (max 30s)
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 1000))
    const pollRes = await fetch(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      { headers: { Authorization: `Token ${apiKey}` } }
    )
    const result = await pollRes.json()

    if (result.status === 'succeeded' && result.output?.[0]) {
      return NextResponse.json({ url: result.output[0] })
    }
    if (result.status === 'failed') {
      return NextResponse.json({ error: 'Generation failed, please try again' }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Timeout, please try again' }, { status: 504 })
}
