import type { Metadata } from 'next'
import EmojiGenerator from '@/components/EmojiGenerator'

export const metadata: Metadata = {
  title: 'Emoji Maker for Slack - Create Custom Slack Emojis with AI',
  description: 'Create custom Slack emojis instantly with AI. Type a description, generate a 128×128 PNG, and upload to your Slack workspace in seconds.',
  alternates: { canonical: 'https://emoji-maker.app/emoji-maker-for-slack' },
}

const FAQ = [
  { q: 'What size should Slack emojis be?', a: 'Slack recommends 128×128 pixels PNG. Our tool exports exactly that size automatically.' },
  { q: 'How do I upload a custom emoji to Slack?', a: 'Go to your Slack workspace → Settings → Customize → Emoji → Add Custom Emoji, then upload the PNG.' },
  { q: 'Can I make animated Slack emojis?', a: 'Currently we generate static PNG emojis. Animated GIF support is coming soon.' },
  { q: 'Is there a limit on custom Slack emojis?', a: 'Slack allows up to 5,000 custom emojis per workspace on paid plans.' },
  { q: 'Are the emojis free to use in Slack?', a: 'Yes, all generated emojis are free to use in your Slack workspace.' },
]

export default function SlackPage() {
  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">💬</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Emoji Maker for Slack</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Generate custom Slack emojis with AI. Type a description and get a 128×128 PNG ready to upload to your workspace.
        </p>
      </div>

      <EmojiGenerator scene="slack" />

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How to add custom emojis to Slack</h2>
        <ol className="space-y-4">
          {[
            'Generate your emoji above and click Download PNG',
            'Open your Slack workspace and go to Settings & Administration → Customize Slack',
            'Click Add Custom Emoji, upload the PNG, and give it a name like :my-emoji:',
          ].map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-600">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">FAQ</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-gray-800 mb-1">{q}</h3>
              <p className="text-sm text-gray-500">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <a href="/emoji-maker-for-discord" className="text-sm text-purple-600 hover:underline">
          Also need Discord emojis? →
        </a>
      </div>
    </div>
  )
}
