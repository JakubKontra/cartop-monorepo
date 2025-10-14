import { JourneyTimeline } from './JourneyTimeline';

export const JourneySection = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="mx-auto max-w-[1360px] px-4">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-normal mb-6 leading-tight">
            Jak vypadá <span className="headline-highlight">cesta</span>
            <br />
            k novému vozu
          </h2>
          <p className="text-lg text-gunmetal-800 leading-relaxed">
            Celá cesta k vašemu autu má být jednoduchá, férová a příjemná. Žádný tlak, žádný chaos –
            jen jasný proces, který šetří čas a přináší dobrý pocit z nového vozu.
          </p>
        </div>

        {/* Timeline */}
        <JourneyTimeline />
      </div>
    </section>
  );
};
