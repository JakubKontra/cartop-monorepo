import { Container, Heading, Img, Section, Text, Row, Column } from "@react-email/components";
import { LayoutTransactional } from "../../src/components/layouts/transactional";
import { Button } from "../../src/components/Button";

interface DocumentsCompleteProps {
  items?: string[];
  offerLink?: string;
}

export const DocumentsCompleteTemplate = ({
  items = ["zimní pneumatiky", "zvýhodněné balíčky při objednávce společně s vozem"],
  offerLink = "Link_TODO",
}: DocumentsCompleteProps) => {
  return (
    <LayoutTransactional title="Podklady kompletní">
      <Container className="mx-auto max-w-2xl bg-white rounded-lg border border-gray-200 w-full">
        <Section className="text-center">
          <Img
            src="https://cartop.madebykontra.com/emails/v2/logo@2x.png"
            alt="Cartop"
            className="mx-auto h-[83px] w-auto"
          />
        </Section>
        <Section className="px-6 py-6" style={{ padding: "24px 16px" }}>
      <Section className="mb-4">
            <Row align="center">
              <Column width={40} style={{ verticalAlign: 'middle' }}>
                <Img
                  src="https://cartop.madebykontra.com/emails/v2/icon-success-email@2x.png"
                  alt="success"
                  width="28"
                  height="28"
                />
              </Column>
              <Column>
                <Heading className="text-lg text-gray-800 font-bold" style={{ fontSize: 18, margin: 0 }}>
                  Podklady kompletní
                </Heading>
              </Column>
            </Row>
          </Section>

          <Text className="text-gray-700 text-base leading-6">Dobrý den,</Text>
          <Text className="text-gray-700 text-base leading-6">váš leasingový proces je nyní kompletní a my pro Vás máme speciální nabídku.</Text>

          <Text className="text-gray-700 text-base leading-6">K novému vozu si můžete jednoduše pořídit také sadu pneumatik za nejlepší možné podmínky přímo od výrobce:</Text>

          <Text className="text-gray-700 font-bold" style={{ marginTop: 12, marginBottom: 0, lineHeight: '1.2' }}>Nabídka zahrnuje:</Text>
          <Section style={{ marginTop: 0, marginBottom: 0, paddingLeft: 10 }}>
            {items.map((it, idx) => (
              <Text key={idx} className="text-gray-700 text-base" style={{ marginTop: 3, marginBottom: 3, lineHeight: '1.2' }}>• {it}</Text>
            ))}
          </Section>

          <Text className="text-gray-700 text-base leading-6 mb-4">Pokud máte zájem, stačí kliknout na tlačítko níže a vybrat si vhodné řešení:</Text>

          <Section className="text-center mb-6">
            <Button href={offerLink} fullWidth>Zobrazit nabídku</Button>
          </Section>

          <Text className="text-gray-700 text-base leading-6 mb-4">Děkujeme, <br/> Váš <b>Cartop.cz</b> tým</Text>
        </Section>
      </Container>
    </LayoutTransactional>
  );
};

export default DocumentsCompleteTemplate;
