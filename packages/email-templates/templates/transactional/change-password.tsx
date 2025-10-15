import {
  Container,
  Heading,
  Img,
  Section,
  Text,
} from "@react-email/components";
import { Button } from "../../src/components/Button";
import { LayoutTransactional } from "../../src/components/layouts/transactional";

interface ChangePasswordProps {
  resetPasswordLink?: string;
  operatingSystem?: string;
  browserName?: string;
}

export const ChangePasswordTemplate = ({
  resetPasswordLink = "https://cartop.cz/reset-password",
  operatingSystem = "Windows",
  browserName = "Chrome",
}: ChangePasswordProps) => {
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

        <Section className="px-6 py-6" style={{ padding: "24px 16px" }}>
          <Heading className="text-2xl text-gray-700 font-bold" style={{ fontSize: "20px", lineHeight: "1.2" }}>
            Dobrý den,
          </Heading>

          <Text className="text-gray-700 text-base leading-6 mb-4">
            Nedávno jste požádali o změnu hesla k&nbsp;vašemu účtu Kindest. Pro
            změnu použijte tlačítko níže. Tento odkaz je
            platný pouze následujících 24&nbsp;hodin.
          </Text>

          <Section className="text-center my-8">
            <Button href={resetPasswordLink} fullWidth>Změnit heslo</Button>
          </Section>

          <Text className="text-gray-700 text-base leading-6 mb-4">
            Z&nbsp;důvodu bezpečnosti byl tento požadavek odeslán ze zařízení s
            operačním systémem <b>{operatingSystem}</b> pomocí prohlížeče{" "}
            <b>{browserName}</b>.
          </Text>

          <Text className="text-gray-700 text-base leading-6 mb-4">
            Pokud jste o&nbsp;reset hesla nepožádali, prosím ignorujte tento e-mail
            nebo kontaktujte podporu, pokud máte dotazy.
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

export default ChangePasswordTemplate;
