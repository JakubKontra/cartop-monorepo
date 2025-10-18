'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';

import { WrapperFadeIn } from '@/components/organisms/animations/WrapperFadeIn';

gsap.registerPlugin(ScrollTrigger);

const timelineContentVariants = tv({
  base: 'text-white',
  variants: {
    side: {
      left: 'pl-16 lg:pl-12 text-left',
      right: 'max-lg:pl-16 lg:pr-12 text-left lg:text-right',
    },
  },
  defaultVariants: {
    side: 'left',
  },
});

interface TimelineStep {
  description: string;
  index: number;
  title: string;
}

const timelineSteps: Omit<TimelineStep, 'index'>[] = [
  {
    description:
      'Za každou naší nabídkou je kus práce – vozy skládáme tak, aby měly správnou výbavu, vysokou bezpečnost a dobrou zůstatkovou hodnotu.\n\nDíky tomu můžeme zajistit férovou cenotvorbu, která vám dává smysl od začátku.',
    title: 'Vytvoření nabídky',
  },
  {
    description:
      'Vybraný vůz vám představíme a doplníme všechny podstatné informace.\n\nK tomu přidáme i tipy, které vás mohou příjemně překvapit – třeba alternativu s lepší výbavou nebo úsporou.\n\nDo pár minut máte na stole přehlednou sumarizaci.',
    title: 'Spojíme se s vámi',
  },
  {
    description:
      'Jsme vám k dispozici pro jakýkoliv dotaz. Druhý den pošleme zpětné ověření, jestli všechno sedí a co můžeme doladit.\n\nPro nás není cílem jen „prodat auto", ale zajistit, že řešení vám opravdu vyhovuje.',
    title: 'Kontrola spokojenosti',
  },
  {
    description:
      'Pokud se rozhodnete pokračovat, provedeme vás celým procesem schválení.\n\nJe jednoduchý, online a automatizovaný. Stačí dodat základní doklady – daňové přiznání za poslední 2 období, případně potvrzení příjmu od zaměstnavatele.\n\nMy se postaráme, aby bylo všechno rychlé a přehledné.',
    title: 'Onboarding',
  },
  {
    description:
      'Auto si přebíráte u jednoho z největších dealerů. Čeká vás kompletní představení vozu a termín, který si sami určíte.\n\nObvykle to zvládneme během několika pracovních dnů od podpisu.',
    title: 'Předání vozu',
  },
  {
    description:
      'Předáním to pro nás nekončí. Jsme vám k dispozici i při samotném používání vozu – ať už jde o radu, nebo řešení komplikací s leasingovkou či dealerem.\n\nNaší prioritou je, abyste měli z auta radost dlouhodobě.',
    title: 'Jsme tu i dál',
  },
];

interface TimelineItemProps extends TimelineStep {
  isLast?: boolean;
  onLastItemRef?: (ref: HTMLDivElement | null) => void;
}

const TimelineItem = ({ index, title, description, isLast, onLastItemRef }: TimelineItemProps) => {
  const isOdd = index % 2 !== 0;
  const side = isOdd ? 'left' : 'right';
  const number = index + 1;

  return (
    <div ref={isLast ? onLastItemRef : undefined} className="relative">
      {/* Numbered circle - positioned absolutely on the line */}
      <div className="absolute left-0 lg:left-1/2 z-10 lg:-translate-x-1/2">
        <div className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-xs text-lg font-semibold text-white">
          {number}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 pt-1">
        {/* Empty left side */}
        {isOdd && <div className="hidden lg:block" />}
        {/* Left side content */}
        <div className={timelineContentVariants({ side })}>
          <h3 className="mb-4 text-xl font-semibold text-white lg:text-2xl">{title}</h3>
          <p className="leading-relaxed text-gunmetal-100 whitespace-pre-line">{description}</p>
        </div>
        {/* Empty right side */}
        {!isOdd && <div className="hidden lg:block" />}
      </div>
    </div>
  );
};

export const JourneyTimeline = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState('calc(100% - 196px)');

  const handleLastItemRef = (ref: HTMLDivElement | null) => {
    lastItemRef.current = ref;
  };

  useEffect(() => {
    if (!lastItemRef.current) return;

    const updateLineHeight = () => {
      if (lastItemRef.current) {
        const lastItemHeight = lastItemRef.current.offsetHeight;
        const circleHeight = 40; // size-10 = 40px
        const adjustedHeight = lastItemHeight - circleHeight;
        setLineHeight(`calc(100% - ${adjustedHeight}px)`);
      }
    };

    // Update on mount and resize
    updateLineHeight();

    const resizeObserver = new ResizeObserver(updateLineHeight);
    resizeObserver.observe(lastItemRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        {
          scaleY: 0,
          transformOrigin: 'top center',
        },
        {
          ease: 'none',
          scaleY: 1,
          scrollTrigger: {
            end: 'bottom center+=10%',
            scrub: 1,
            start: 'top center+=10%',
            trigger: containerRef.current,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-6xl my-12">
      {/* Vertical red line - ends at center of last circle */}
      <div
        ref={lineRef}
        className="absolute left-5 lg:left-1/2 w-0.5 -translate-x-1/2 bg-primary"
        style={{ height: lineHeight }}
      />

      {/* Timeline items */}
      <div className="space-y-12 lg:space-y-24">
        {timelineSteps.map((step, index) => {
          const isLast = index === timelineSteps.length - 1;
          return (
            <WrapperFadeIn key={index} delay={index * 0.1} duration={0.6} threshold={0.5}>
              <TimelineItem
                index={index}
                title={step.title}
                description={step.description}
                isLast={isLast}
                onLastItemRef={handleLastItemRef}
              />
            </WrapperFadeIn>
          );
        })}
      </div>
    </div>
  );
};
