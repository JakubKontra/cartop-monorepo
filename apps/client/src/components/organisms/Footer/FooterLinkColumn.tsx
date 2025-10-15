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
      <h3 className="mb-6 text-base font-semibold text-gunmetal-200">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map(link => {
          const isViewAll = link.label === 'Zobrazit vše';
          return (
            <li key={link.href} className={isViewAll ? 'pt-7' : ''}>
              <Link
                href={link.href}
                className={`text-sm underline hover:no-underline ${
                  isViewAll ? 'text-gunmetal-200' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
