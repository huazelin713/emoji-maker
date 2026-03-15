import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Emoji Maker - Free Custom Emoji Generator',
  description: 'Generate custom AI emojis for Slack, Discord, and more. Free online emoji maker — type a description and download your emoji instantly.',
  openGraph: {
    title: 'AI Emoji Maker - Free Custom Emoji Generator',
    description: 'Generate custom AI emojis for Slack, Discord, and more.',
    url: 'https://emoji-maker.app',
    siteName: 'EmojiMaker',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen flex flex-col`}>
        <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-purple-600 flex items-center gap-2">
            🎨 EmojiMaker
          </a>
          <nav className="flex gap-6 text-sm text-gray-500">
            <a href="/emoji-maker-for-slack" className="hover:text-purple-600 transition-colors">For Slack</a>
            <a href="/emoji-maker-for-discord" className="hover:text-purple-600 transition-colors">For Discord</a>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 px-6 py-8 text-center text-sm text-gray-400">
          © 2025 EmojiMaker · AI-powered custom emoji generator
        </footer>
      </body>
    </html>
  )
}
