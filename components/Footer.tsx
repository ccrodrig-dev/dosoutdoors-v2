import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
        <p className="font-['Charmonman'] text-lg text-stone-700">Dos Outdoors</p>
        <div className="flex gap-6">
          <Link href="/articles" className="hover:text-stone-800 transition-colors">Articles</Link>
          <Link href="/about" className="hover:text-stone-800 transition-colors">About</Link>
          <Link href="/privacy-cookie-policy" className="hover:text-stone-800 transition-colors">Privacy</Link>
        </div>
        <p>© {new Date().getFullYear()} Dos Outdoors. All rights reserved.</p>
      </div>
    </footer>
  )
}
