'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { WrapperFadeIn } from '@/components/organisms/animations/WrapperFadeIn';
import { cn } from '@/utils/cv';

gsap.registerPlugin(ScrollTrigger);

interface TimelineStep {
  description: string;
  number: number;
  side: 'left' | 'right';
  title: string;
}

const timelineSteps: TimelineStep[] = [
  {
    description:
      'Za každou naší nabídkou je kus práce – vozy skládáme tak, aby měly správnou výbavu, vysokou bezpečnost a dobrou zůstatkovou hodnotu. Díky tomu můžeme zajistit férovou cenotvorbu, která vám dává smysl od začátku.',
    number: 1,
    side: 'left',
    title: 'Vytvoření nabídky',
  },
  {
    description:
      'Vybraný vůz vám představíme a doplníme všechny podstatné informace. K tomu přidáme i tipy, které vás mohou příjemně překvapit – třeba alternativu s lepší výbavou nebo úsporou. Do pár minut máte na stole přehlednou sumarizaci.',
    number: 2,
    side: 'right',
    title: 'Spojíme se s vámi',
  },
  {
    description:
      'Jsme vám k dispozici pro jakýkoliv dotaz. Druhý den pošleme zpětné ověření, jestli všechno sedí a co můžeme doladit. Pro nás není cílem jen „prodat auto", ale zajistit, že řešení vám opravdu vyhovuje.',
    number: 3,
    side: 'left',
    title: 'Kontrola spokojenosti',
  },
  {
    description:
      'Pokud se rozhodnete pokračovat, provedeme vás celým procesem schválení. Je jednoduchý, online a automatizovaný. Stačí dodat základní doklady – daňové přiznání za poslední 2 období, případně potvrzení příjmu od zaměstnavatele. My se postaráme, aby bylo všechno rychlé a přehledné.',
    number: 4,
    side: 'right',
    title: 'Onboarding',
  },
  {
    description:
      'Auto si přebíráte u jednoho z největších dealerů. Čeká vás kompletní představení vozu a termín, který si sami určíte. Obvykle to zvládneme během několika pracovních dnů od podpisu.',
    number: 5,
    side: 'left',
    title: 'Předání vozu',
  },
  {
    description:
      'Předáním to pro nás nekončí. Jsme vám k dispozici i při samotném používání vozu – ať už jde o radu, nebo řešení komplikací s leasingovkou či dealerem. Naší prioritou je, abyste měli z auta radost dlouhodobě.',
    number: 6,
    side: 'right',
    title: 'Jsme tu i dál',
  },
];

interface TimelineItemProps {
  step: TimelineStep;
}

const TimelineItem = ({ step }: TimelineItemProps) => {
  return (
    <div className="relative">
      {/* Numbered circle - positioned absolutely on the line */}
      <div className="absolute left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-white text-lg font-semibold text-primary lg:h-14 lg:w-14 lg:text-xl">
          {step.number}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          'grid grid-cols-2 items-start gap-8',
          step.side === 'left' ? 'text-right' : '',
        )}
      >
        {step.side === 'left' ? (
          <>
            {/* Left side content */}
            <div className="pr-12">
              <h3 className="mb-4 text-xl font-semibold text-gunmetal lg:text-2xl">{step.title}</h3>
              <p className="leading-relaxed text-gunmetal-800">{step.description}</p>
            </div>
            {/* Empty right side */}
            <div />
          </>
        ) : (
          <>
            {/* Empty left side */}
            <div />
            {/* Right side content */}
            <div className="pl-12">
              <h3 className="mb-4 text-xl font-semibold text-gunmetal lg:text-2xl">{step.title}</h3>
              <p className="leading-relaxed text-gunmetal-800">{step.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const JourneyTimeline = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative mx-auto w-full max-w-6xl py-12">
      {/* Vertical red line - ends at center of last circle */}
      <div
        ref={lineRef}
        className="absolute top-12 left-1/2 w-0.5 -translate-x-1/2 bg-primary"
        style={{ height: 'calc(100% - 196px)' }}
      />

      {/* Timeline items */}
      <div className="space-y-24">
        {timelineSteps.map((step, index) => (
          <WrapperFadeIn key={step.number} delay={index * 0.1} duration={0.6} threshold={0.5}>
            <TimelineItem step={step} />
          </WrapperFadeIn>
        ))}
      </div>
    </div>
  );
};
