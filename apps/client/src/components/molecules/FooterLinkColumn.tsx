import Link from 'next/link';

export interface FooterLink {
  href: string;
  label: string;
}

interface FooterLinkColumnProps {
  className?: string;
  links: FooterLink[];
  title: string;
}

export const FooterLinkColumn = ({ className = '', links, title }: FooterLinkColumnProps) => {
  return (
    <div className={className}>
      <h3 className="mb-4 text-base font-semibold text-gunmetal-200">{title}</h3>
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.href}>
            <Link className="text-sm text-white underline hover:no-underline" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
