import {
  Container,
  Img,
  Section
} from "@react-email/components";
import { OfferCard } from "../../src/components/OfferCard";
import { LayoutTransactional } from "../../src/components/layouts/transactional";
import CallCta from "../../src/components/CallCta";
import CustomerTestimonials from "../../src/components/CustomerTestimonials";

type SingleLeasingEmailProps = {
  catalogPrice?: string;
  ourPrice?: string;
  originalPrice?: string;
  validityHeadline?: string;
  validityNote?: string;
};

function SingleLeasingTemplate({
  catalogPrice = "1 294 488 Kč s DPH",
  ourPrice = "11 999 Kč bez DPH",
  originalPrice = "19 638 Kč bez DPH",
  validityHeadline = "DO 3 MĚSÍCŮ",
  validityNote = "Platí pro omezený počet kusů!",
}: SingleLeasingEmailProps) {
  return (
    <LayoutTransactional title="Reset your Cartop password">
      <Container className="mx-auto max-w-2xl bg-white rounded-lg border border-gray-200 w-full">
        <Section className="text-center">
          <Img
            src="https://cartop.madebykontra.com/emails/v2/logo@2x.png"
            alt="Cartop"
            className="mx-auto h-[83px] w-auto"
          />
        </Section>

        <OfferCard
          carName="BMW X1, 20d (163 Hp) xDrive Steptronic, M Sportovní Paket"
          carImage="https://cartop.madebykontra.com/emails/v2/car.png"
          catalogPrice={catalogPrice}
          ourPrice={ourPrice}
          originalPrice={originalPrice}
          validityHeadline={validityHeadline}
          validityNote={validityNote}
          leaseDuration="24 měs."
          mileage="10 000 - 50 000 km"
          inclusions="kompletního servisu, letní pneu, POV + HAV"
          description="BMW X1 v designovém provedení a výbavě M sportovní paket. Vozidlo disponuje silným dieselovým motorem, prémiovým zpracováním, pohonem všech kol a paketem Premium, který zahrnuje například adaptivní LED světlomety. Díky svým rozměrům se hodí i do městského provozu. Jedinečná nabídka v poměru cena/výkon pro menší prémiové SUV."
          pricingOptions={[
            { mileage: "10 000 km", duration: "12 Měsíců", price: "9 753 Kč" },
            { mileage: "15 000 km", duration: "24 Měsíců", price: "11 250 Kč" },
            { mileage: "20 000 km", duration: "36 Měsíců", price: "12 890 Kč" }
          ]}
        />

        
       
        <CustomerTestimonials />
        <CallCta />
       <Section className="text-center mt-12 mb-12">
        <Img src="https://cartop.madebykontra.com/emails/v2/cars.png" alt="Call Cta" className="mx-auto w-auto max-w-full" style={{ maxHeight: "250px", height: "auto" }} />
        </Section>
      </Container>
    </LayoutTransactional>
  );
};

export default SingleLeasingTemplate;
