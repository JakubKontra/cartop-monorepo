import type { FaqItemData } from '@/components/organisms/Faq';
import { Faq } from '@/components/organisms/Faq';

import HowItWorksButton from '../organisms/reusable/HowItWorksButton';

const faqData: FaqItemData[] = [
  {
    question: 'Vyplatní se mi operativní leasing?',
    answer:
      'Ano, protože platíte jen měsíční částku, která už zahrnuje servis, pojištění, amortizaci i financování. Odpadá vstupní investice, starost o prodej vozu i průběžné nečekané náklady.',
  },
  {
    question: 'Proč jsou vaše nabídky tak zajímavé?',
    answer:
      'Protože vozy řešíme ve velkých objemech přímo s importéry a dealery. Díky tomu získáme lepší podmínky a ty pak kombinujeme s financováním od všech velkých leasingových společností. Jsme jediní na trhu, kdo může spolupracovat se všemi – proto vám umíme objektivně ukázat nejlepší řešení.',
  },
  {
    question: 'Pro koho jsou nabídky určené?',
    answer:
      'Pro firmy, OSVČ i soukromé osoby. Cena je vždy stejná – nehledíme na to, kdo auto bere. Všechny spojuje to, že chtějí mít náklady pod kontrolou a ušetřené peníze využít efektivněji.',
  },
  {
    question: 'Co potřebuji ke schválení operativního leasingu?',
    answer:
      'Stačí doložit daňová přiznání za poslední dvě účetní období (u firem a OSVČ), nebo potvrzení příjmu (u soukromých osob). Přidáte kopii občanského a řidičského průkazu a je hotovo. Vše probíhá online a bez složitého papírování.Nemáte dvouletou historii? Není to problém. Potřebujeme jen poslední tři měsíce historie, případně ručitele. Vždy hledáme cestu, jak řešení nastavit.',
  },
  {
    question: 'Kdo je smluvním partnerem?',
    answer:
      'Jsme tvůrci nabídek a řešení. Smluvním partnerem je vždy renomovaná leasingová společnost nebo dealer, u kterého si vůz převezmete.',
  },
  {
    question: 'Kde a jak probíhá předání vozu?',
    answer:
      'Předání probíhá vždy u jednoho z největších dealerů – s kompletním představením vozu a ve vámi zvoleném termínu. Obvykle to zvládneme během pár pracovních dnů od podpisu, nebo hned, jak dorazí vůz z výroby.',
  },
];

const generateFaqStructuredData = (items: FaqItemData[]) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return JSON.stringify(structuredData);
};

export const FaqSection = () => {
  const faqStructuredData = generateFaqStructuredData(faqData);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqStructuredData }} />

      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center lg:text-left mb-14">
            <h2 className="mb-4 text-4xl lg:text-5xl">
              <span className="headline-highlight">Často</span>
              <br />
              Kladené otázky
            </h2>
          </div>

          <Faq items={faqData} />

          {/* Contact Support Button */}
          <div className="flex justify-center w-full mt-14">
            <HowItWorksButton />
          </div>
        </div>
      </section>
    </>
  );
};
