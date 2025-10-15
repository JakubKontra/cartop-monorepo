'use client';

import type { ReactNode } from 'react';

import { Clock, Facebook, FileText, Home, Instagram, Mail, Phone, Send, Users } from 'lucide-react';

import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';

const InfoRow = ({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex size-10 items-center justify-center rounded-[12px] bg-gunmetal-100 text-gray-800">
      {icon}
    </div>
    <div className="flex flex-col">
      <p className="line-height-[160%] text-xs font-normal tracking-[0.01em] text-gunmetal-700">
        {title}
      </p>
      <div className="line-height-[160%] text-sm font-semibold tracking-[0.01em] text-gunmetal">
        {children}
      </div>
    </div>
  </div>
);

export default function Contacts() {
  return (
    <div className="mx-auto flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { hideLabel: true, href: '/', icon: <Home className="h-4 w-4" />, label: 'Domů' },
          { label: 'Kontakt' },
        ]}
      />
      <section className="w-full bg-white text-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <aside className="space-y-8">
              <div className="rounded-2xl  p-4 sm:p-6 lg:p-8">
                <header className="mb-8 lg:mb-12">
                  <h2 className="line-height-[120%] text-5xl font-semibold tracking-[0.01em] text-primary sm:text-4xl">
                    Potřebujete poradit?
                  </h2>
                  <p className="line-height-[120%] mt-1 text-2xl tracking-[0.01em] sm:text-3xl">
                    Kontaktujte nás
                  </p>
                </header>
                <div>
                  <h3 className="font-regular mb-7 text-gunmetal-800">Kontaktní informace</h3>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-8">
                      <InfoRow icon={<Phone className="h-5 w-5" />} title="Telefonní číslo">
                        <a className="hover:underline" href="tel:+420604544776">
                          +420 604 544 776
                        </a>
                      </InfoRow>

                      <InfoRow icon={<Users className="h-5 w-5" />} title="Kontakt pro partnery">
                        <a className="break-all hover:underline" href="mailto:partner@cartop.cz">
                          partner@cartop.cz
                        </a>
                      </InfoRow>

                      <InfoRow icon={<Mail className="h-5 w-5" />} title="Emailová adresa">
                        <a className="break-all hover:underline" href="mailto:info@cartop.cz">
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
                </div>
                <div className="mt-20">
                  <h3 className="font-regular mb-7 text-gunmetal-800">Sledujte nás</h3>
                  <div className="grid grid-cols-2 gap-8 space-y-3">
                    <InfoRow icon={<Facebook className="h-5 w-5" />} title="Facebook">
                      <a className="font-semibold hover:underline" href="#">
                        /cartop
                      </a>
                    </InfoRow>

                    <InfoRow icon={<Instagram className="h-5 w-5" />} title="Instagram">
                      <a className="font-semibold hover:underline" href="#">
                        @cartopcz
                      </a>
                    </InfoRow>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:pl-4">
              <div className="rounded-2xl bg-gunmetal-50 p-4 sm:p-6 lg:p-8">
                <div className="mb-9">
                  <h3 className="line-height-[120%] mb-4 text-2xl font-normal tracking-[0.01em]">
                    Nenašli jste <span className="font-semibold text-primary">to pravé?</span>
                  </h3>
                  <p className="font-regular line-height-[160%] mb-5 text-base font-normal tracking-[0.01em] text-gunmetal-800">
                    Rádi Vás budeme upozorňovat na ty nejlepší nabídky, ale pokud Vás zajímá něco
                    konkrétního, stačí si jen vybrat kategorii, značku či model.
                  </p>
                </div>

                <form noValidate className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <label className="block">
                    <span className="sr-only">Jméno</span>
                    <input
                      required
                      className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                      name="firstName"
                      placeholder="Jméno *"
                      type="text"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Příjmení</span>
                    <input
                      required
                      className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                      name="lastName"
                      placeholder="Příjmení *"
                      type="text"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Telefonní číslo</span>
                    <input
                      required
                      className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                      name="phone"
                      placeholder="Telefonní číslo *"
                      type="tel"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Vaše zpráva</span>
                    <textarea
                      required
                      className="h-32 w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                      name="message"
                      placeholder="Vaše zpráva... *"
                    />
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input required className="h-4 w-4 rounded border-gray-400" type="checkbox" />
                    <span>Souhlasím s Obchodními odmínkami</span>
                  </label>

                  <button
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-white transition hover:bg-red-700"
                    type="submit"
                  >
                    <Send className="h-4 w-4" />
                    Odeslat formulář
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
