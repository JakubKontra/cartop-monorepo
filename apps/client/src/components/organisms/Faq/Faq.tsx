import { Accordion } from '@/components/molecules/Accordion/Accordion';
import { AccordionItem } from '@/components/molecules/Accordion/AccordionItem';
import { cn } from '@/utils/cv';

import { FaqIcon } from './FaqIcon';

export interface FaqItemData {
  answer: string;
  question: string;
}

interface FaqProps {
  defaultOpenIndex?: number;
  items: FaqItemData[];
}

export const Faq = ({ defaultOpenIndex, items }: FaqProps) => {
  return (
    <Accordion ariaLabel="Často kladené otázky">
      {items.map((item, index) => {
        const isDefaultOpen = defaultOpenIndex !== undefined && index === defaultOpenIndex;
        // Use question as key since it's unique within FAQ context
        const itemKey = `faq-${item.question.slice(0, 30).replace(/\s+/g, '-').toLowerCase()}`;

        return (
          <AccordionItem
            key={itemKey}
            content={<p className="leading-relaxed text-gunmetal">{item.answer}</p>}
            icon={<FaqIcon />}
            index={index}
            isDefaultOpen={isDefaultOpen}
            title={item.question}
            containerClassName={cn(
              'rounded-2xl border transition-all duration-300 lg:rounded-3xl',
              'border-gunmetal-100 bg-white text-gunmetal',
              '[&:has(button[aria-expanded="true"])]:bg-gunmetal-100',
            )}
          />
        );
      })}
    </Accordion>
  );
};
