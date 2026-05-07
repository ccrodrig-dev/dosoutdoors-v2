import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-['Charmonman'] text-3xl font-bold text-stone-800 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-stone-800 mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-stone-700 leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-5 italic text-stone-600 my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-stone-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-stone-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-stone-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value).width(900).url()
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image src={url} alt={value.alt ?? ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
          {value.caption && <figcaption className="text-center text-sm text-stone-400 mt-2">{value.caption}</figcaption>}
        </figure>
      )
    },
    externalImage: ({ value }) => (
      <figure className="my-8">
        <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image src={value.url} alt={value.alt ?? ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
        </div>
        {value.caption && <figcaption className="text-center text-sm text-stone-400 mt-2">{value.caption}</figcaption>}
      </figure>
    ),
  },
}

export default function ArticleBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="max-w-prose mx-auto">
      <PortableText value={body} components={components} />
    </div>
  )
}
