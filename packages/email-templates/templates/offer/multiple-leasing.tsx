import { Container, Img, Section } from '@react-email/components';
import { OfferCard } from '../../src/components/OfferCard';
import { LayoutTransactional } from '../../src/components/layouts/transactional';
import CustomerTestimonials from '../../src/components/CustomerTestimonials';
import CallCta from '../../src/components/CallCta';

type MultipleLeasingEmailProps = {
  // Props can be extended later for dynamic content
};

export function MultipleLeasingTemplate({}: MultipleLeasingEmailProps) {
  return (
    <LayoutTransactional title="Multiple Leasing Offers - Cartop">
      <Container className="mx-auto max-w-2xl bg-white rounded-lg border border-gray-200 w-full">
        <Section className="text-center">
          <Img
            src="https://cartop.madebykontra.com/emails/v2/logo@2x.png"
            alt="Cartop"
            className="mx-auto h-[83px] w-auto"
          />
        </Section>

        {/* First Offer - BMW X1 */}
        <OfferCard
          carName="BMW X1, 20d (163 Hp) xDrive Steptronic, M Sportovní Paket"
          carImage="https://cartop.madebykontra.com/emails/v2/car.png"
          catalogPrice="1 294 488 Kč s DPH"
          ourPrice="11 999 Kč bez DPH"
          originalPrice="19 638 Kč bez DPH"
          validityHeadline="DO 3 MĚSÍCŮ"
          validityNote="Platí pro omezený počet kusů!"
          leaseDuration="24 měsíců"
          mileage="10 000 - 50 000 km"
          inclusions="kompletního servisu, letní pneu, POV + HAV"
          description="BMW X1 v designovém provedení a výbavě M sportovní paket. Vozidlo disponuje silným dieselovým motorem, prémiovým zpracováním, pohonem všech kol a paketem Premium, který zahrnuje například adaptivní LED světlomety. Díky svým rozměrům se hodí i do městského provozu. Jedinečná nabídka v poměru cena/výkon pro menší prémiové SUV."
          pricingOptions={[
            { mileage: '10 000 km', duration: '12 Měsíců', price: '9 753 Kč' },
            { mileage: '15 000 km', duration: '24 Měsíců', price: '11 250 Kč' },
            { mileage: '20 000 km', duration: '36 Měsíců', price: '12 890 Kč' },
          ]}
        />

        {/* Spacing between offers */}
        <Section style={{ height: '32px' }} />

        {/* Second Offer - Audi A4 */}
        <OfferCard
          carName="Audi A4, 2.0 TDI (190 Hp) Quattro S tronic, S line"
          carImage="https://cartop.madebykontra.com/emails/v2/car.png"
          catalogPrice="1 485 900 Kč s DPH"
          ourPrice="13 500 Kč bez DPH"
          originalPrice="21 200 Kč bez DPH"
          validityHeadline="DO 2 MĚSÍCŮ"
          validityNote="Omezená nabídka!"
          leaseDuration="36 měsíců"
          mileage="15 000 - 45 000 km"
          inclusions="plného servisu, zimní pneu, pojištění"
          description="Audi A4 ve sportovní verzi S line s pokročilými technologiemi. Elegantní sedan s výkonným dieselovým motorem a pohon všech kol Quattro. Perfektní volba pro náročné zákazníky, kteří hledají kombinaci luxusu, výkonu a spolehlivosti. Ideální pro dlouhé cesty i městské ježdění."
          pricingOptions={[
            { mileage: '15 000 km', duration: '24 Měsíců', price: '12 890 Kč' },
            { mileage: '20 000 km', duration: '36 Měsíců', price: '13 500 Kč' },
            { mileage: '25 000 km', duration: '48 Měsíců', price: '14 250 Kč' },
          ]}
        />

        {/* Spacing between offers */}
        <Section style={{ height: '32px' }} />

        {/* Third Offer - Mercedes C-Class */}
        <OfferCard
          carName="Mercedes-Benz C 220 d, 4MATIC (194 Hp) 9G-TRONIC, AMG Line"
          carImage="https://cartop.madebykontra.com/emails/v2/car.png"
          catalogPrice="1 650 000 Kč s DPH"
          ourPrice="15 200 Kč bez DPH"
          originalPrice="23 800 Kč bez DPH"
          validityHeadline="DO 1 MĚSÍCE"
          validityNote="Exkluzivní nabídka!"
          leaseDuration="48 měsíců"
          mileage="20 000 - 60 000 km"
          inclusions="prémiového servisu, komplexního pojištění, asistenčních systémů"
          description="Mercedes-Benz C-Class v prestižní AMG Line výbavě. Luxusní sedan s nejnovějšími technologiami a bezpečnostními systémy. Pohon všech kol 4MATIC a automatická převodovka 9G-TRONIC zajišťují maximální komfort jízdy. Symbol elegance a špičkové kvality německého automobilového průmyslu."
          pricingOptions={[
            { mileage: '20 000 km', duration: '24 Měsíců', price: '14 500 Kč' },
            { mileage: '25 000 km', duration: '36 Měsíců', price: '15 200 Kč' },
            { mileage: '30 000 km', duration: '48 Měsíců', price: '16 100 Kč' },
          ]}
        />

        <CallCta />
        <Section className="text-center mt-12 mb-12">
          <Img
            src="https://cartop.madebykontra.com/emails/v2/cars.png"
            alt="Call Cta"
            className="mx-auto w-auto max-w-full"
            style={{ maxHeight: '250px', height: 'auto' }}
          />
        </Section>
      </Container>
    </LayoutTransactional>
  );
}
