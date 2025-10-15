import {
  Container,
  Heading,
  Img,
  Section,
  Text,
} from "@react-email/components";
import { Button } from "../../src/components/Button";
import { LayoutTransactional } from "../../src/components/layouts/transactional";

interface AccountVerifyProps {
  loginLink?: string;
  urlLink?: string;
}

export const AccountVerifyTemplate = ({
  loginLink = "Link_TODO",
  urlLink = "Link_TODO",
}: AccountVerifyProps) => {
  return (
    <LayoutTransactional title="Verify your Cartop account">
      <Container className="mx-auto max-w-2xl bg-white rounded-lg border border-gray-200 w-full">
        <Section className="text-center">
          <Img
            src="https://cartop.madebykontra.com/emails/v2/logo@2x.png"
            alt="Cartop"
            className="mx-auto h-[83px] w-auto"
          />
        </Section>
        <Section className="px-6 py-6" style={{ padding: "24px 16px" }}>
          <Heading className="text-2xl text-gray-700 font-bold" style={{ fontSize: "20px", lineHeight: "1.2" }}>
            Dobrý den,
          </Heading>

          <Text className="text-gray-700 text-base leading-6 mb-4">
            Pro přihlášení do Cartopu prosím ověřte svůj e-mail. Pro dokončení ověření stačí kliknout na tlačítko níže.
          </Text>

          <Section className="text-center my-8">
            <Button href={loginLink} fullWidth>Přihlásit do mého účtu</Button>
          </Section>

          <Text className="text-gray-700 text-base leading-6 mb-4">
            Nebo zkopírujte a vložte tuto adresu URL do svého prohlížeče: <b>{urlLink}</b>.
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

export default AccountVerifyTemplate;
