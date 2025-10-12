import Link from "next/link"
import { SocialMediaLinks } from "../../molecules/SocialMediaLinks"

export function FooterCopyright() {
  return (
    <div className="border-t border-gray-600 mt-12 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-white">
          <p>© 2025 Cartop. All rights reserved.</p>
          <Link href="/privacy-policy" className="hover:underline transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline transition-colors">
            Terms of Service
          </Link>
        </div>
        <SocialMediaLinks />
      </div>
    </div>
  )
}
