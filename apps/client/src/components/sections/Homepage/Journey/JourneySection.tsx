import { SectionHeader } from '../SectionHeader';
import { JourneyTimeline } from './JourneyTimeline';

export const JourneySection = () => {
  return (
    <section className="section-container flex flex-col items-center py-20">
      <SectionHeader
        textAlignVariant="center"
        highlightedWord="Jak vypadá"
        remainingTitle="cesta k novému vozu"
        subtitle="Celá cesta k vašemu autu má být jednoduchá, férová a příjemná. Žádný tlak, žádný chaos – jen jasný proces, který šetří čas a přináší dobrý pocit z nového vozu."
        className="max-w-4xl"
      />
      <JourneyTimeline />
    </section>
  );
};
