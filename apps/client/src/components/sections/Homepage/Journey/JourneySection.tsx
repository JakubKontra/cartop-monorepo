import { JourneyTimeline } from './JourneyTimeline';

export const JourneySection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1360px] px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
          <h2 className="mb-6 text-4xl leading-tight font-normal lg:text-5xl">
            Jak vypadá <span className="headline-highlight">cesta</span>
            <br />k novému vozu
          </h2>
          <p className="text-lg leading-relaxed text-gunmetal-800">
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
