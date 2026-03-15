import type { Metadata } from 'next'
import EmojiGenerator from '@/components/EmojiGenerator'

export const metadata: Metadata = {
  title: 'Emoji Maker for Discord - Create Custom Discord Emojis with AI',
  description: 'Create custom Discord server emojis with AI. Generate unique 128×128 PNG emojis and upload them to your Discord server instantly.',
  alternates: { canonical: 'https://emoji-maker.app/emoji-maker-for-discord' },
}

const FAQ = [
  { q: 'What size should Discord emojis be?', a: 'Discord supports up to 256×256 pixels, but 128×128 PNG works perfectly and keeps file size small.' },
  { q: 'How do I upload a custom emoji to Discord?', a: 'Go to your server → Server Settings → Emoji → Upload Emoji, then select the PNG file.' },
  { q: 'How many custom emojis can a Discord server have?', a: 'Free servers get 50 emoji slots. Boosted servers get up to 250 slots.' },
  { q: 'Can I use these emojis on any Discord server?', a: 'Custom emojis can be used on the server they are uploaded to. Nitro users can use them anywhere.' },
  { q: 'Are the generated emojis copyright-free?', a: 'Yes, AI-generated emojis from our tool are free for personal and commercial use.' },
]

export default function DiscordPage() {
  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🎮</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Emoji Maker for Discord</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Generate unique Discord server emojis with AI. Type a description and get a custom emoji ready to upload in seconds.
        </p>
      </div>

      <EmojiGenerator scene="discord" />

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How to add custom emojis to Discord</h2>
        <ol className="space-y-4">
          {[
            'Generate your emoji above and click Download PNG',
            'Open your Discord server and go to Server Settings → Emoji',
            'Click Upload Emoji, select the PNG, and give it a name',
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
        <a href="/emoji-maker-for-slack" className="text-sm text-purple-600 hover:underline">
          Also need Slack emojis? →
        </a>
      </div>
    </div>
  )
}
