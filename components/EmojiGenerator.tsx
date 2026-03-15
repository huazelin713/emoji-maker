'use client'

import { useState } from 'react'

const DAILY_LIMIT = 3
const storageKey = () => `emoji_count_${new Date().toISOString().slice(0, 10)}`

function getDailyCount(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(storageKey()) || '0', 10)
}

function incrementDailyCount() {
  const count = getDailyCount() + 1
  localStorage.setItem(storageKey(), String(count))
  return count
}

const PLACEHOLDERS = [
  'a happy cat with sunglasses',
  'a rocket launching into space',
  'a cute panda eating bamboo',
  'a fire breathing dragon',
  'a sleepy sloth on a branch',
]

export default function EmojiGenerator({ scene }: { scene?: string }) {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [limitReached, setLimitReached] = useState(false)

  const placeholder = scene
    ? `e.g. a ${scene} themed emoji with sunglasses`
    : PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]

  async function handleGenerate() {
    if (!prompt.trim() || loading) return

    if (getDailyCount() >= DAILY_LIMIT) {
      setLimitReached(true)
      return
    }

    setLoading(true)
    setError(null)
    setImageUrl(null)
    setLimitReached(false)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setImageUrl(data.url)
      incrementDailyCount()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong, please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDownload() {
    if (!imageUrl) return
    try {
      // Fetch via proxy to avoid CORS issues with canvas
      const res = await fetch(`/api/proxy-image?url=${encodeURIComponent(imageUrl)}`)
      const blob = await res.blob()
      const img = await createImageBitmap(blob)
      const canvas = document.createElement('canvas')
      canvas.width = 128
      canvas.height = 128
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, 128, 128)
      canvas.toBlob((b) => {
        if (!b) return
        const url = URL.createObjectURL(b)
        const a = document.createElement('a')
        a.href = url
        a.download = `emoji-${Date.now()}.png`
        a.click()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch {
      // Fallback: direct download link
      const a = document.createElement('a')
      a.href = imageUrl
      a.download = `emoji-${Date.now()}.png`
      a.target = '_blank'
      a.click()
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder={placeholder}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-10 flex flex-col items-center gap-3 text-gray-400">
          <div className="w-10 h-10 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin" />
          <p className="text-sm">Generating your emoji, hang tight...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
      )}

      {/* Daily limit */}
      {limitReached && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded-xl text-center">
          <p className="text-sm font-medium text-purple-700">
            You&apos;ve used your {DAILY_LIMIT} free generations today 🎉
          </p>
          <p className="text-xs text-purple-400 mt-1">Pro plan coming soon — unlimited generations!</p>
        </div>
      )}

      {/* Result */}
      {imageUrl && !loading && (
        <div className="mt-10 flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Generated emoji"
            className="w-32 h-32 rounded-2xl shadow-md"
          />
          <button
            onClick={handleDownload}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            ⬇ Download PNG (128×128)
          </button>
          <p className="text-xs text-gray-400">Ready for Slack & Discord</p>
        </div>
      )}
    </div>
  )
}
