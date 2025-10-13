import { Accordion, AccordionItem } from '@/components/molecules/Accordion';
import { cn } from '@/utils/cv';

import { FaqIcon } from './FaqIcon';

export interface FaqItemData {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItemData[];
  defaultOpenIndex?: number;
}

export const Faq = ({ items, defaultOpenIndex }: FaqProps) => {
  return (
    <Accordion ariaLabel="Často kladené otázky">
      {items.map((item, index) => {
        const isDefaultOpen = defaultOpenIndex !== undefined && index === defaultOpenIndex;

        return (
          <AccordionItem
            key={index}
            index={index}
            isDefaultOpen={isDefaultOpen}
            title={item.question}
            content={<p className="leading-relaxed text-gunmetal">{item.answer}</p>}
            containerClassName={cn(
              'rounded-2xl border transition-all duration-300 lg:rounded-3xl',
              'border-gunmetal-100 bg-white text-gunmetal',
              '[&:has(button[aria-expanded="true"])]:bg-gunmetal-100',
            )}
            icon={<FaqIcon />}
          />
        );
      })}
    </Accordion>
  );
};
