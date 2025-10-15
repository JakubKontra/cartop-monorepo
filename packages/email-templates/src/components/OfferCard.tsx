import {
  Heading,
  Img,
  Section,
  Text,
  Hr,
  Row,
  Column,
  Link,
} from "@react-email/components";
import { TableButton } from "./TableButton";
import Button from "./Button";
import { CustomerTestimonials } from "./CustomerTestimonials";

interface PricingOption {
  mileage: string;
  duration: string;
  price: string;
}

interface OfferCardProps {
  title?: string;
  carName: string;
  carImage: string;
  catalogPrice: string;
  ourPrice: string;
  originalPrice: string;
  validityHeadline: string;
  validityNote: string;
  leaseDuration: string;
  mileage: string;
  inclusions: string;
  description: string;
  pricingOptions: PricingOption[];
  availabilityMessage?: string;
  customizationMessage?: string;
}

export const OfferCard = ({
  title = "Operativní leasing:",
  carName,
  carImage,
  catalogPrice,
  ourPrice,
  originalPrice,
  validityHeadline,
  validityNote,
  leaseDuration,
  mileage,
  inclusions,
  description,
  pricingOptions,
  availabilityMessage = "VOZIDLA JSOU K DISPOZICI V NĚKOLIKA BAREVNÝCH PROVEDENÍ.",
  customizationMessage = "MOŽNOST LIBOVOLNĚ UPRAVOVAT VÝŠI POTŘEBNÉHO ROČNÍHO NÁJEZDU AŽ DO 50 000 KM/ROK.",
}: OfferCardProps) => {
  return (
    <Section className="px-6 py-6" style={{ padding: "24px 16px" }}>
      <Text className="m-0 text-cartop-teal p-0">{title}</Text>
      <Heading
        className="text-2xl mt-0 pt-0 text-gray-700 font-bold leading-tight"
        style={{ fontSize: "20px", lineHeight: "1.2" }}
      >
        {carName}
      </Heading>
      <Hr />
      <Img
        src={carImage}
        alt={carName.split(",")[0]}
        className="mx-auto w-auto max-w-full"
        style={{ maxHeight: "250px", height: "auto" }}
      />
      <Hr className="p-0 m-0" />

      {/* Responsive pricing section - desktop single row, mobile two rows */}
      <Section className="bg-white mx-auto max-w-full">
        <Section className="border border-[#e2e8f0]">
          {/* Desktop: Single row layout (hidden on mobile) */}
          <Row className="hidden md:table w-full">
            <Column
              className="table-cell align-top p-3 pl-4"
              style={{ width: "60%" }}
            >
              <Text className="text-[#222831] text-[13px] leading-tight m-0 p-0">
                Katalogová cena:
              </Text>
              <Text className="text-[#222831] text-[13px] font-bold leading-[1.1] m-0 mt-1 p-0">
                {catalogPrice}
              </Text>

              <Text className="text-[#c81435] text-[14px] font-bold tracking-tight m-0 mt-3 p-0">
                {validityHeadline}
              </Text>
              <Text className="text-[#c81435] text-[12px] leading-snug m-0 mt-1 p-0">
                {validityNote}
              </Text>
            </Column>

            <Column
              className="table-cell align-top bg-[#c81435] text-white p-4"
              style={{ width: "40%" }}
            >
              <Text className="text-white text-[11px] m-0 leading-tight">
                Naše cena:
              </Text>
              <Text className="text-white text-[16px] font-bold leading-[1.1] m-0">
                {ourPrice}
              </Text>

              <Text className="text-white/90 text-[11px] m-0 leading-tight mt-3">
                Původní cena:
              </Text>
              <Text className="text-white text-[11px] m-0">
                {originalPrice}
              </Text>
            </Column>
          </Row>

          {/* Mobile: Two row layout (hidden on desktop) */}
          <div className="block md:hidden">
            <Row>
              <Column className="w-full p-3 pl-4">
                <Text className="text-[#222831] text-[11px] leading-tight m-0 p-0">
                  Katalogová cena:
                </Text>
                <Text className="text-[#222831] text-[16px] font-bold leading-[1.1] m-0 mt-1 p-0">
                  {catalogPrice}
                </Text>

                <Text className="text-[#c81435] text-[16px] font-extrabold tracking-tight m-0 mt-3 p-0">
                  {validityHeadline}
                </Text>
                <Text className="text-[#c81435] text-[11px] leading-snug m-0 mt-1 p-0">
                  {validityNote}
                </Text>
              </Column>
            </Row>

            <Row>
              <Column className="w-full bg-[#c81435] text-white p-4">
                <Text className="text-white text-[11px] m-0 leading-tight">
                  Naše cena:
                </Text>
                <Text className="text-white text-[16px] font-extrabold leading-[1.1] m-0">
                  {ourPrice}
                </Text>

                <Text className="text-white/90 text-[11px] m-0 leading-tight mt-3">
                  Původní cena:
                </Text>
                <Text className="text-white text-[11px] m-0">
                  {originalPrice}
                </Text>
              </Column>
            </Row>
          </div>
        </Section>
      </Section>
      <Hr className="p-0 m-0" />

      <Text>
        <b>Délka trvání leasingu:</b> {leaseDuration} <br />
        <b>Roční nájezd:</b> {mileage} <br />
        <b>Včetně:</b> {inclusions} <br />
      </Text>

      <Text>{description}</Text>

      <Text className="text-[#222831] uppercase font-bold">
        {availabilityMessage}
      </Text>

      <Text className="text-[#c81435] uppercase font-bold ">
        {customizationMessage}
      </Text>

      {/* Responsive pricing table using react-email components */}
      <Section style={{ marginTop: "24px", width: "100%" }}>
        <Section style={{ border: "1px solid #262D37", width: "100%" }}>
          {/* Header row */}
          <Row style={{ backgroundColor: "#262D37" }}>
            <Column
              style={{
                padding: "12px",
                borderRight: "1px solid #262D37",
                textAlign: "center",
                width: "25%",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                Roční nájezd
              </Text>
            </Column>
            <Column
              style={{
                padding: "12px",
                borderRight: "1px solid #262D37",
                textAlign: "center",
                width: "25%",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                Délka pronájmu
              </Text>
            </Column>
            <Column
              style={{
                padding: "12px",
                borderRight: "1px solid #262D37",
                textAlign: "center",
                width: "25%",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                Naše cena
              </Text>
            </Column>
            <Column
              style={{
                padding: "12px",
                textAlign: "center",
                width: "25%",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  margin: "0",
                  textAlign: "center",
                }}
              >
              
              </Text>
            </Column>
          </Row>

          {/* Dynamic pricing rows */}
          {pricingOptions.map((option, index) => (
            <Row
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa" }}
            >
              <Column
                style={{
                  padding: "12px",
                  borderRight: "1px solid #262D37",
                  borderBottom:
                    index < pricingOptions.length - 1
                      ? "1px solid #262D37"
                      : "none",
                  textAlign: "center",
                  width: "25%",
                }}
              >
                <Text
                  style={{
                    color: "#222831",
                    fontSize: "14px",
                    fontWeight: '400',
                    margin: "0",
                    textAlign: "center",
                  }}
                >
                  {option.mileage}
                </Text>
              </Column>
              <Column
                style={{
                  padding: "12px",
                  borderRight: "1px solid #262D37",
                  borderBottom:
                    index < pricingOptions.length - 1
                      ? "1px solid #262D37"
                      : "none",
                  textAlign: "center",
                  width: "25%",
                }}
              >
                <Text
                  style={{
                    color: "#222831",
                    fontSize: "14px",
                    fontWeight: '400',
                    margin: "0",
                    textAlign: "center",
                  }}
                >
                  {option.duration}
                </Text>
              </Column>
              <Column
                style={{
                  padding: "12px",
                  borderRight: "1px solid #262D37",
                  borderBottom:
                    index < pricingOptions.length - 1
                      ? "1px solid #262D37"
                      : "none",
                  textAlign: "center",
                  width: "25%",
                }}
              >
                <Text
                  style={{
                    color: "#222831",
                    fontSize: "12px",
                    fontWeight: '400',
                    margin: "0 0 8px 0",
                    textAlign: "center",
                  }}
                >
                  {option.price}
                </Text>
              </Column>
              <Column
                style={{
                  padding: "12px",
                  borderBottom:
                    index < pricingOptions.length - 1
                      ? "1px solid #262D37"
                      : "none",
                  textAlign: "center",
                  width: "25%",
                }}
              >
                <TableButton href="#">ZVOLIT</TableButton>
              </Column>
            </Row>
          ))}
        </Section>
      </Section>

      <Section className="text-center mt-6">
        <div className="mb-3">
          <Button variant="green" href="#" fullWidth>
            NABÍDKA SE MI LÍBÍ
          </Button>
        </div>

        <div className="mb-3">
          <Button variant="red" href="#" fullWidth>
            ZOBRAZIT VÝBAVU
          </Button>
        </div>

        <div className="mb-3">
          <Button variant="outline" fullWidth>
            CHCI UPRAVIT KONFIGURACI
          </Button>
        </div>
        

        <div className="mt-4">
          <Link href="#" className="text-[#C90932] underline text-center">
            Chci nabídku jiného vozu
          </Link>
        </div>
      </Section>
    </Section>
  );
};

export default OfferCard;