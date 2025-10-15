'use client';

import Button from '@/components/organisms/Button/Button';
import { ExploreCard } from './ExploreCard';
import { Filter } from 'lucide-react';

const exploreData = [
  {
    title: 'Prémiové SUV',
    content:
      'Spojují špičkový komfort, nejnovější technologie a vysokou bezpečnost. Ideální volba, pokud chcete auto, které má styl i smysl.',
    imageSrc: '/mock/explore-selection/explore-0.png',
    imageAlt: 'Premium SUV',
  },
  {
    title: 'Mainstream SUV',
    content:
      'Praktická a cenově dostupná SUV pro každodenní použití. Nabízí dostatek prostoru a spolehlivost.',
    imageSrc: '/mock/explore-selection/explore-1.png',
    imageAlt: 'Mainstream SUV',
  },
  {
    title: 'Sportovní',
    content:
      'Dynamické vozy pro ty, kdo milují rychlost a vynikající jízdní vlastnosti. Spojení výkonu a elegance.',
    imageSrc: '/mock/explore-selection/explore-2.png',
    imageAlt: 'Sportovní',
  },
  {
    title: 'Rodinné',
    content:
      'Prostorné a bezpečné vozy ideální pro rodiny. Komfort pro všechny cestující a dostatek místa na zavazadla.',
    imageSrc: '/mock/explore-selection/explore-3.png',
    imageAlt: 'Rodinné',
  },
  {
    title: 'Elektrické',
    content:
      'Moderní elektromobily s dlouhým dojezdem a ekologickým provozem. Budoucnost automobilové dopravy.',
    imageSrc: '/mock/explore-selection/explore-4.png',
    imageAlt: 'Elektrické',
  },
];

export default function ExploreSelection() {
  return (
    <div className="w-full py-20">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 px-4 max-w-[1360px] mx-auto justify-between mb-14">
        <div>
          <h2 className="w-full text-4xl lg:text-5xl mb-4">
            Prozkoumejte <span className="headline-highlight">náš výběr</span> vozů
          </h2>
          <p className="w-full">Připravili jsme pro vás přehled těch nejzajímavějších kategorií.</p>
        </div>
        <div className="flex items-end">
          <Button variant="primary" icon={<Filter className="size-5" />}>
            Filtrovat vozy
          </Button>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1360px] px-4 grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Large Featured Card - Takes half width */}
        <ExploreCard
          title={exploreData[0].title}
          content={exploreData[0].content}
          imageSrc={exploreData[0].imageSrc}
          imageAlt={exploreData[0].imageAlt}
          setOpenInViewPort={true}
        />

        {/* 2x2 Grid of Smaller Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {exploreData.slice(1).map((item, index) => (
            <ExploreCard
              key={index}
              title={item.title}
              content={item.content}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
