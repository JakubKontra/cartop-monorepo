'use client';

import { Send } from 'lucide-react';

export const ContactForm = () => (
  <div className="rounded-2xl bg-gunmetal-50 p-4 sm:p-6 md:p-8">
    <div className="mb-6 md:mb-8">
      <h3 className="mb-3 text-2xl leading-[120%] font-normal tracking-[0.01em] md:mb-4">
        Nenašli jste <span className="font-semibold text-primary">to pravé?</span>
      </h3>
      <p className="text-base leading-[160%] font-normal tracking-[0.01em] text-gunmetal-800">
        Rádi Vás budeme upozorňovat na ty nejlepší nabídky, ale pokud Vás zajímá něco konkrétního,
        stačí si jen vybrat kategorii, značku či model.
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
);
