import { SectionHeader } from '../SectionHeader';
import { AdditionalServicesCarousel } from './AdditionalServicesCarousel';
import { AdditionalServicesCarouselSlide } from './AdditionalServicesCarouselSlide';

export const AdditionalServices = () => {
  const items = [
    {
      innerItem: (
        <AdditionalServicesCarouselSlide
          image={'/images/homepage/additional-services/Prodej-stávajícího-vozu.png'}
          alt="Financování vozů"
          title={
            <>
              <span className="headline-highlight">Financování</span>
              <br />
              vozů
            </>
          }
          text={
            'Každý zákazník má jiné potřeby – někdo preferuje přímou koupi, jiný hledá operativní leasing. Naše velikost nám umožňuje vyjednat podmínky, na které běžně nedosáhnete. Dostanete tak produkty, které jinde nenajdete.'
          }
          buttonLink="#"
        />
      ),
      buttonText: 'Financování vozů',
    },
    {
      innerItem: (
        <AdditionalServicesCarouselSlide
          image={'/images/homepage/additional-services/Pojištění.png'}
          alt="Pojištění"
          title={<span className="headline-highlight">Pojištění</span>}
          text={
            'Pojištění je často oblast, kde lidé platí víc, než musí. Spolupracujeme s největšími pojišťovnami na trhu a vždy vám připravíme přehledné srovnání variant. Vy si vyberete tu, která vám nejvíc vyhovuje – podle ceny, rozsahu krytí i služeb navíc.'
          }
          buttonLink="#"
        />
      ),
      buttonText: 'Pojištění',
    },
    {
      innerItem: (
        <AdditionalServicesCarouselSlide
          image={'/images/homepage/additional-services/Predelivery.png'}
          alt="Predelivery car"
          title={<span className="headline-highlight">Predelivery car</span>}
          text={
            'Na vysněné auto se někdy čeká. U nás ale nečekáte pěšky – automaticky od nás dostanete náhradní vůz, který můžete používat hned. Díky tomu plynule přejdete z jednoho auta do druhého a nemusíte měnit svůj každodenní režim.'
          }
          buttonLink="#"
        />
      ),
      buttonText: 'Predelivery car',
    },
    {
      innerItem: (
        <AdditionalServicesCarouselSlide
          image={'/images/homepage/additional-services/Opravy.png'}
          alt="Opravy poškození"
          title={<span className="headline-highlight">Opravy poškození</span>}
          text={
            'Škrábanec na laku, odřený disk nebo drobné poškození? Většinou jde o maličkosti, ale u běžného servisu by stály zbytečně moc. My vás nasměrujeme na specializovaná pracoviště, kde opravy vyjdou za zlomek ceny. Každý problém můžete konzultovat s námi – poradíme vám nejrychlejší a nejvýhodnější postup.'
          }
          buttonLink="#"
        />
      ),
      buttonText: 'Opravy poškození',
    },
    {
      innerItem: (
        <AdditionalServicesCarouselSlide
          image={'/images/homepage/additional-services/Pneumatiky.png'}
          alt="Pneumatiky"
          title={<span className="headline-highlight">Pneumatiky</span>}
          text={
            'S příchodem zimy řeší pneumatiky každý řidič. My vám včas zašleme nabídku sady přesně pro váš vůz – a to za podmínek, které byste sami jen těžko hledali. Díky tomu ušetříte čas i peníze a máte jistotu, že jezdíte bezpečně a s kvalitní výbavou.'
          }
          buttonLink="#"
        />
      ),
      buttonText: 'Pneumatiky',
    },
  ];

  return (
    <section className="section-container flex flex-col items-center w-full">
      <SectionHeader
        highlightedWord="Doplňkové"
        remainingTitle="služby"
        textAlignVariant="center"
        subtitle="Chceme, abyste vše, co souvisí s pořízením vozu, vyřešili na jednom místě – rychle, přehledně a s jistotou, že každá služba je nastavená férově a výhodně."
        className="max-w-3xl"
      />
      <AdditionalServicesCarousel
        items={items}
        interval={3000}
        id="additional-services-carousel"
        cardClassName="rounded-3xl"
      />
    </section>
  );
};
