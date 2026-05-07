import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy & Cookie Policy',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-['var(--font-charmonman)'] text-5xl font-bold text-stone-800 mb-10">
        Privacy & Cookie Policy
      </h1>
      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-5">
        <p>
          At Dos Outdoors, your privacy is important to us. This page explains how we collect and use information
          when you visit our website.
        </p>
        <h2 className="text-2xl font-semibold text-stone-800 mt-8">Cookies</h2>
        <p>
          We use cookies to improve your browsing experience. Cookies are small text files stored on your device.
          We may use analytics cookies (such as Google Analytics) to understand how visitors use our site. You can
          disable cookies in your browser settings at any time.
        </p>
        <h2 className="text-2xl font-semibold text-stone-800 mt-8">Third-Party Services</h2>
        <p>
          We may use third-party services including Google Analytics and affiliate programs. These services may collect
          information per their own privacy policies.
        </p>
        <h2 className="text-2xl font-semibold text-stone-800 mt-8">Contact</h2>
        <p>
          If you have any questions about this policy, please reach out through our About page.
        </p>
      </div>
    </div>
  )
}
