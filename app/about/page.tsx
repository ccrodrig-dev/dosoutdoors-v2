import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Dos Outdoors — a couple sharing travel stories and outdoor adventures.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-['var(--font-charmonman)'] text-5xl font-bold text-stone-800 mb-10">About Us</h1>

      <div className="relative w-full rounded-2xl overflow-hidden aspect-video mb-10">
        <Image
          src="https://imagestravelblog.s3.us-east-2.amazonaws.com/dostogetherjpeg.jpg"
          alt="Dos Outdoors couple"
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-5">
        <p>
          Welcome to Dos Outdoors! We are a couple who loves to travel the world and embark on outdoor adventures.
          From camping in bear country to exploring the streets of Italy, we&apos;ve done it all — and we can&apos;t wait to share it with you.
        </p>
        <p>
          We are travelers who enjoy cultural experiences, authentic food, and breathtaking views. Our goal is to inspire
          you to get outside and explore — whether that means a weekend hike in your local mountains or a flight across the world.
        </p>
        <p>
          We&apos;ve put together our experiences, tips, and stories to help guide you on your next adventure. Every article
          is written from personal experience — no sponsored fluff, just honest guides from people who love the outdoors.
        </p>
      </div>
    </div>
  )
}
