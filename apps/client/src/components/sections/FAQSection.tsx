'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cv';
import { WrapperFadeIn } from '@/components/reusable/aimation-wrappers/WrapperFadeIn';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}
const faqData: FAQItem[] = [
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

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLUListElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useIntersectionObserver({ ref: sectionRef, threshold: 0.2 });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setOpenIndex(0);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center lg:text-left mb-14">
          <h2 className="mb-4 text-4xl lg:text-5xl">
            <span className="headline-highlight">Často</span>
            <br />
            Kladené otázky
          </h2>
        </div>

        {/* FAQ Items */}
        <ul ref={sectionRef} className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <WrapperFadeIn as="li" key={index} duration={0.6} threshold={0.8}>
                <div
                  className={cn(
                    `rounded-2xl lg:rounded-3xl border transition-all duration-300`,
                    isOpen
                      ? 'bg-gunmetal-100 text-gunmetal border-gunmetal-100'
                      : 'bg-white text-gunmetal border-gunmetal-100',
                  )}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-4 lg:p-6 text-left flex justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex flex-col justify-center">
                      <span className="font-semibold text-lg lg:text-xl pr-4">{faq.question}</span>
                      <div
                        className={cn(
                          'transition-[max-height, opacity, padding-top] duration-300 h-auto',
                          isOpen ? 'pt-6 max-h-96 opacity-100' : 'pt-0 max-h-0 opacity-0',
                        )}
                      >
                        <p className="text-gunmetal leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        `relative size-11 lg:size-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300`,
                        isOpen ? 'bg-gunmetal-700' : 'bg-primary',
                      )}
                    >
                      <Minus className="text-white size-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <Minus
                        className={cn(
                          'text-white size-6 transition-transform duration-300',
                          isOpen ? 'rotate-0' : 'rotate-90',
                        )}
                      />
                    </div>
                  </button>
                </div>
              </WrapperFadeIn>
            );
          })}
        </ul>

        {/* Contact Support Button */}
        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto transition-colors">
            Kontakovat podporu
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
