import { Home } from 'lucide-react';

import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';
import { ContactHeader } from '@/components/molecules/ContactHeader';
import { ContactSocialMediaSection } from '@/components/molecules/ContactSocialMediaSection';
import { ContactForm } from '@/components/organisms/ContactForm';
import { ContactInfoSection } from '@/components/organisms/ContactInfoSection';

export default function Contacts() {
  return (
    <div className="mx-auto flex flex-col gap-6 md:gap-8 lg:gap-10">
      <Breadcrumbs
        items={[
          { hideLabel: true, href: '/', icon: <Home className="h-4 w-4" />, label: 'Domů' },
          { label: 'Kontakt' },
        ]}
      />
      <section className="w-full bg-white text-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
            <aside className="space-y-6 md:space-y-8">
              <div className="rounded-2xl p-4 sm:p-6 md:p-8">
                <ContactHeader />
                <ContactInfoSection />
                <ContactSocialMediaSection />
              </div>
            </aside>

            <div className="md:pl-4 lg:pl-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
