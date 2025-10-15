import { InfoRow } from '@/components/molecules/InfoRow';
import { Facebook, Instagram } from 'lucide-react';

export const ContactSocialMediaSection = () => (
  <div className="mt-12 md:mt-16 lg:mt-20">
    <h3 className="mb-4 font-normal text-gunmetal-800 md:mb-6">Sledujte nás</h3>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
      <InfoRow icon={<Facebook className="h-5 w-5" />} title="Facebook">
        <a
          className="break-all text-primary underline hover:no-underline"
          href="https://facebook.com/cartop.cz"
        >
          /cartop.cz
        </a>
      </InfoRow>

      <InfoRow icon={<Instagram className="h-5 w-5" />} title="Instagram">
        <a
          className="break-all text-primary underline hover:no-underline"
          href="https://instagram.com/cartop.cz"
        >
          @cartopcz
        </a>
      </InfoRow>
    </div>
  </div>
);
