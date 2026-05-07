'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-['Charmonman'] text-2xl font-bold text-stone-800 tracking-wide">
          Dos Outdoors
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/articles" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            Articles
          </Link>
          <Link href="/about" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            About
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded text-stone-600 hover:text-stone-900"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 flex flex-col gap-4">
          <Link href="/articles" className="text-sm font-medium text-stone-700" onClick={() => setOpen(false)}>
            Articles
          </Link>
          <Link href="/about" className="text-sm font-medium text-stone-700" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      )}
    </nav>
  )
}
