import {
  Container,
  Heading,
  Img,
  Section,
  Text,
} from "@react-email/components";
import { LayoutTransactional } from "../../src/components/layouts/transactional";

interface RequiredDocumentsProps {
  items?: string[];
}

export const RequiredDocumentsTemplate = ({
  items = ["[seznam požadovaných podkladů]"],
}: RequiredDocumentsProps) => {
  return (
    <LayoutTransactional title="Požadované podklady">
      <Container className="mx-auto max-w-2xl bg-white rounded-lg border border-gray-200 w-full">
        <Section className="text-center">
          <Img
            src="https://cartop.madebykontra.com/emails/v2/logo@2x.png"
            alt="Cartop"
            className="mx-auto h-[83px] w-auto"
          />
        </Section>

          <Section className="px-6 py-6" style={{ padding: "24px 16px" }}>
            <Heading
              className="text-2xl text-gray-700 font-bold"
              style={{ fontSize: "20px", lineHeight: "1.2" }}
            >
              Dobrý den,
            </Heading>

            <Text className="text-gray-700 text-base leading-6 mb-4">
              děkujeme, že jste projevil zájem o leasing. Abychom mohli pokračovat ve
              schvalovacím procesu, prosíme o doložení následujících podkladů:
            </Text>

            <Section className="mb-4">
              {items.map((it, idx) => (
                <Text key={idx} className="text-gray-700 text-base leading-6" style={{ marginBottom: 8 }}>
                  • {it}
                </Text>
              ))}
            </Section>

            <Text className="text-gray-700 text-base leading-6 mb-4">
              Jakmile nám podklady poskytnete, budeme je moci zkontrolovat a postoupit k dalšímu
              zpracování. Pokud bude něco neúplné nebo nesprávné, ozveme se Vám s žádostí o doplnění.
            </Text>

            <Text className="text-gray-700 text-base leading-6 mb-4">
              Děkujeme, <br />
              Váš <b>Cartop.cz</b> tým
            </Text>
          </Section>

        </Container>
    </LayoutTransactional>
  );
};

export default RequiredDocumentsTemplate;
