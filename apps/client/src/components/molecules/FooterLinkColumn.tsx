import Link from "next/link"

export interface FooterLink {
  href: string
  label: string
}

interface FooterLinkColumnProps {
  title: string
  links: FooterLink[]
  className?: string
}

export function FooterLinkColumn({ title, links, className = "" }: FooterLinkColumnProps) {
  return (
    <div className={className}>
      <h3 className="font-semibold mb-4 text-base text-gunmetal-200">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-white underline hover:no-underline text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
