import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { SocialIcon } from "../atoms/SocialIcon"

// Custom X/Twitter icon since lucide-react's Twitter icon might be outdated
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function SocialMediaLinks() {
  return (
    <div className="flex items-center gap-4">
      <SocialIcon
        href="https://facebook.com"
        icon={Facebook}
        label="Facebook"
        className="text-white hover:underline"
      />
      <SocialIcon
        href="https://instagram.com"
        icon={Instagram}
        label="Instagram"
      />
      <SocialIcon
        href="https://x.com"
        icon={XIcon}
        label="X (Twitter)"
      />
      <SocialIcon
        href="https://linkedin.com"
        icon={Linkedin}
        label="LinkedIn"
      />
      <SocialIcon
        href="https://youtube.com"
        icon={Youtube}
        label="YouTube"
      />
    </div>
  )
}
