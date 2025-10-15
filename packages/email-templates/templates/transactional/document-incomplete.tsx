import { Container, Heading, Hr, Img, Section, Text, Row, Column } from "@react-email/components";
import { LayoutTransactional } from "../../src/components/layouts/transactional";

interface DocumentIncompleteProps {
  saleRepresentativeName?: string;
  comment?: string;
}

export const DocumentIncompleteTemplate = ({
  saleRepresentativeName = "SaleRepresentativeName",
  comment = "Je potřeba doložit následující dokumenty:",
}: DocumentIncompleteProps) => {
  return (
    <LayoutTransactional title="Doplňte podklady k leasingu">
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
                  src="https://cartop.madebykontra.com/emails/v2/icon-error-email@2x.png"
                  alt="error"
                  width="28"
                  height="28"
                />
              </Column>
              <Column>
                <Heading className="text-lg text-gray-800 font-bold">
                  Doplňte podklady k leasingu
                </Heading>
              </Column>
            </Row>
          </Section>

          <Text className="text-gray-700 text-base leading-6 mb-3">Dobrý den,</Text>
          <Text className="text-gray-700 text-base leading-6 mb-3">děkujeme, že jste nám zaslal podklady pro schválení leasingu.</Text>

          <Text className="text-gray-700 text-base leading-6 mb-6">Při kontrole jsme však zjistili, že je potřeba je ještě doplnit / opravit:</Text>

          <Hr />

          <Text className="text-gray-700 text-base leading-6 mb-2"><b>{saleRepresentativeName}</b> zanechal komentář:</Text>


          <Text className="text-gray-700 text-lg leading-relaxed mb-4">
            “{comment}”
          </Text>

          <Hr className="mb-6" />

          <Text className="text-gray-700 text-base leading-6 mb-3">Prosíme o zaslání doplněných dokumentů co nejdříve, abychom mohli pokračovat v procesu schválení.</Text>

          <Text className="text-gray-700 text-base leading-6 mb-3"><b>Pokud budete mít jakékoliv dotazy, neváhejte se na nás obrátit.</b></Text>

          <Text className="text-gray-700 text-base leading-6 mb-4">Děkujeme, <br/> Váš <b>Cartop.cz</b> tým</Text>
        </Section>
      </Container>
    </LayoutTransactional>
  );
};

export default DocumentIncompleteTemplate;
