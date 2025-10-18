import HowItWorksButton from '@/components/organisms/HowItWorksButton';
import { SectionHeader } from '../SectionHeader';
import { JourneyTimeline } from './JourneyTimeline';

export const JourneySection = () => {
  return (
    <section className="section-container max-lg:!px-0 py-20 flex justify-center">
      <div className="bg-gunmetal flex flex-col items-center rounded-4xl py-20 w-full px-4">
        <SectionHeader
          textAlignVariant="center"
          highlightedWord="Jak vypadá"
          remainingTitle="cesta k novému vozu"
          subtitle={
            'Celá cesta k vašemu autu má být jednoduchá, férová a příjemná.\nŽádný tlak, žádný chaos – jen jasný proces, který šetří čas a přináší dobrý pocit z nového vozu.'
          }
          className="max-w-2xl whitespace-pre-line"
          variant="light"
        />
        <JourneyTimeline />
        <div className="mt-10 lg:mt-14 flex w-full justify-center">
          <HowItWorksButton />
        </div>
      </div>
    </section>
  );
};
