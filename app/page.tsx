import type { Metadata } from 'next'
import EmojiGenerator from '@/components/EmojiGenerator'

export const metadata: Metadata = {
  title: 'AI Emoji Maker - Free Custom Emoji Generator',
  description: 'Create custom AI emojis for Slack, Discord, and more. Free online emoji maker — type a description, generate, and download in seconds.',
  alternates: { canonical: 'https://emoji-maker.app' },
}

const HOW_TO = [
  { step: '1', title: 'Describe your emoji', desc: 'Type anything — "a happy cat", "fire dragon", "sleepy panda"' },
  { step: '2', title: 'AI generates it', desc: 'Our AI creates a unique emoji just for you in seconds' },
  { step: '3', title: 'Download & use', desc: 'Get a 128×128 PNG ready for Slack, Discord, or anywhere' },
]

const FAQ = [
  { q: 'Is this emoji maker free?', a: 'Yes! You get 3 free generations per day with no sign-up required.' },
  { q: 'What size are the emojis?', a: 'All emojis are exported as 128×128 PNG — the standard size for Slack and Discord.' },
  { q: 'Can I use these emojis commercially?', a: 'Yes, all generated emojis are yours to use freely, including commercially.' },
  { q: 'How long does generation take?', a: 'Usually 5–15 seconds depending on server load.' },
  { q: 'Do you store my images?', a: 'No. Images are processed in your browser and never stored on our servers.' },
]

export default function HomePage() {
  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          AI Emoji Maker
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Generate custom emojis with AI. Type a description, get a unique emoji — ready for Slack, Discord, or anywhere.
        </p>
      </div>

      {/* Generator */}
      <EmojiGenerator />

      {/* How it works */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {HOW_TO.map(({ step, title, desc }) => (
            <div key={step} className="text-center p-6 bg-purple-50 rounded-2xl">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm">
                {step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scene cards */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/emoji-maker-for-slack"
          className="p-6 border border-gray-100 rounded-2xl hover:border-purple-300 hover:shadow-sm transition-all group"
        >
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            Emoji Maker for Slack
          </h3>
          <p className="text-sm text-gray-500 mt-1">Create custom Slack emojis in seconds</p>
        </a>
        <a
          href="/emoji-maker-for-discord"
          className="p-6 border border-gray-100 rounded-2xl hover:border-purple-300 hover:shadow-sm transition-all group"
        >
          <div className="text-3xl mb-3">🎮</div>
          <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            Emoji Maker for Discord
          </h3>
          <p className="text-sm text-gray-500 mt-1">Make unique Discord server emojis with AI</p>
        </a>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-gray-800 mb-1">{q}</h3>
              <p className="text-sm text-gray-500">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
