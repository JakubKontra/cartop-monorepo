import { InfoRow } from '@/components/molecules/InfoRow';
import { Clock, FileText, Mail, Phone, Users } from 'lucide-react';

export const ContactInfoSection = () => (
  <div>
    <h3 className="mb-4 font-normal text-gunmetal-800 md:mb-6">Kontaktní informace</h3>

    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
      <InfoRow icon={<Phone className="h-5 w-5" />} title="Telefonní číslo">
        <a className="text-primary underline hover:no-underline" href="tel:+420604544776">
          +420 604 544 776
        </a>
      </InfoRow>

      <InfoRow icon={<Users className="h-5 w-5" />} title="Kontakt pro partnery">
        <a
          className="break-all text-primary underline hover:no-underline"
          href="mailto:partner@cartop.cz"
        >
          partner@cartop.cz
        </a>
      </InfoRow>

      <InfoRow icon={<Mail className="h-5 w-5" />} title="Emailová adresa">
        <a
          className="break-all text-primary underline hover:no-underline"
          href="mailto:info@cartop.cz"
        >
          info@cartop.cz
        </a>
      </InfoRow>

      <InfoRow icon={<Clock className="h-5 w-5" />} title="Otevírací doba">
        Po – Pá 9.00–18.00 h
      </InfoRow>

      <InfoRow icon={<FileText className="h-5 w-5" />} title="Fakturační údaje">
        <>
          CTO Group, s.r.o.
          <br />
          IČ 089 888 20
          <br />
          Hornokrčská 1947/2
          <br />
          Praha 4, 140 00
        </>
      </InfoRow>
    </div>
  </div>
);
