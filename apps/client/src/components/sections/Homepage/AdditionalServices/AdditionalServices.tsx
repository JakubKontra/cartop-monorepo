import { AdditionalServicesCarousel } from './AdditionalServicesCarousel';
import { AdditionalServicesCarouselSlide } from './AdditionalServicesCarouselSlide';

export const AdditionalServices = () => {
  const items = [
    {
      innerItem: (
        <AdditionalServicesCarouselSlide
          image={'/images/homepage/additional-services/Prodej-stávajícího-vozu.png'}
          alt="Financování vozů"
          title={'Financování vozů'}
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
          title={'Pojištění'}
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
          title={'Predelivery car'}
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
          title={'Opravy poškození'}
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
          title={'Pneumatiky'}
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
    <section className="section-container w-full">
      <AdditionalServicesCarousel
        items={items}
        interval={3000000}
        id="additional-services-carousel"
        cardClassName="rounded-3xl"
      />
    </section>
  );
};
