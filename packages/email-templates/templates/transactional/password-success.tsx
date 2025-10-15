import {
  Container,
  Heading,
  Img,
  Section,
  Text,
} from "@react-email/components";
import { Button } from "../../src/components/Button";
import { LayoutTransactional } from "../../src/components/layouts/transactional";

interface PasswordSuccessProps {
  loginLink?: string;
  firstName?: string;
  lastName?: string;
}

export const PasswordSuccessTemplate = ({
  loginLink = "Link_TODO",
  firstName = "Jakub",
  lastName = "Kontra",
}: PasswordSuccessProps) => {
  return (
    <LayoutTransactional title="Success your Cartop password">
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
            Heslo k vašemu účtu na Cartop.cz {firstName} {lastName} bylo úspěšně změněno. 
            Pokud jste tuto změnu neprovedli, prosím kontaktujte nás.
          </Text>

          <Section className="text-center my-8">
            <Button href={loginLink} fullWidth>Pokračovat do účtu</Button>
          </Section>

        </Section>
      </Container>
    </LayoutTransactional>
  );
};

export default PasswordSuccessTemplate;
