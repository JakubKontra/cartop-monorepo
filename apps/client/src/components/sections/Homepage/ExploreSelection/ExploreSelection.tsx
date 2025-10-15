'use client';

import { Filter } from 'lucide-react';

import Button from '@/components/atoms/button/Button';

import { ExploreCard } from './ExploreCard';

const exploreData = [
  {
    content:
      'Spojují špičkový komfort, nejnovější technologie a vysokou bezpečnost. Ideální volba, pokud chcete auto, které má styl i smysl.',
    imageAlt: 'Premium SUV',
    imageSrc: '/mock/explore-selection/explore-0.png',
    title: 'Prémiové SUV',
  },
  {
    content:
      'Praktická a cenově dostupná SUV pro každodenní použití. Nabízí dostatek prostoru a spolehlivost.',
    imageAlt: 'Mainstream SUV',
    imageSrc: '/mock/explore-selection/explore-1.png',
    title: 'Mainstream SUV',
  },
  {
    content:
      'Dynamické vozy pro ty, kdo milují rychlost a vynikající jízdní vlastnosti. Spojení výkonu a elegance.',
    imageAlt: 'Sportovní',
    imageSrc: '/mock/explore-selection/explore-2.png',
    title: 'Sportovní',
  },
  {
    content:
      'Prostorné a bezpečné vozy ideální pro rodiny. Komfort pro všechny cestující a dostatek místa na zavazadla.',
    imageAlt: 'Rodinné',
    imageSrc: '/mock/explore-selection/explore-3.png',
    title: 'Rodinné',
  },
  {
    content:
      'Moderní elektromobily s dlouhým dojezdem a ekologickým provozem. Budoucnost automobilové dopravy.',
    imageAlt: 'Elektrické',
    imageSrc: '/mock/explore-selection/explore-4.png',
    title: 'Elektrické',
  },
];

export default function ExploreSelection() {
  return (
    <div className="w-full py-20">
      <div className="mx-auto mb-14 flex max-w-[1360px] flex-col justify-between gap-4 px-4 lg:flex-row lg:gap-8">
        <div>
          <h2 className="mb-4 w-full text-4xl lg:text-5xl">
            Prozkoumejte <span className="headline-highlight">náš výběr</span> vozů
          </h2>
          <p className="w-full">Připravili jsme pro vás přehled těch nejzajímavějších kategorií.</p>
        </div>
        <div className="flex items-end">
          <Button icon={<Filter className="size-5" />} variant="primary">
            Filtrovat vozy
          </Button>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-3 px-4 lg:grid-cols-2">
        {/* Large Featured Card - Takes half width */}
        <ExploreCard
          setOpenInViewPort
          content={exploreData[0].content}
          imageAlt={exploreData[0].imageAlt}
          imageSrc={exploreData[0].imageSrc}
          title={exploreData[0].title}
        />

        {/* 2x2 Grid of Smaller Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {exploreData.slice(1).map((item, index) => (
            <ExploreCard
              key={index}
              content={item.content}
              imageAlt={item.imageAlt}
              imageSrc={item.imageSrc}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
