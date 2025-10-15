import { Container, Heading, Img, Link, Section, Text } from "@react-email/components";
import { LayoutTransactional } from "../../src/components/layouts/transactional";

export const ContactConfirmationTemplate = ({ 
  phoneNumber = "+420 608 599 607" 
}) => {
  return (
    <LayoutTransactional title="Ozveme se Vám">
      <Container className="mx-auto max-w-2xl bg-white rounded-lg border border-gray-200 w-full">
        <Section className="text-center">
          <Img
            src="https://cartop.madebykontra.com/emails/v2/logo@2x.png"
            alt="Cartop"
            className="mx-auto h-[83px] w-auto"
          />
        </Section>

        <Section className="px-6 py-6" style={{ padding: "24px 16px" }}>
          <Heading className="text-lg text-gray-800 font-bold" style={{ fontSize: 18, marginBottom: 16 }}>
            Zkoušeli jsme vám dovolat na{' '}
            <Link 
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              style={{
                color: '#C90932',
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}
            >
              {phoneNumber}
            </Link>
          </Heading>

          <Text className="text-gray-700 text-base leading-6 mb-3">
            Dobrý den,
          </Text>

          <Text className="text-gray-700 text-base leading-6 mb-3">
            zkoušeli jsme vás dnes kontaktovat telefonicky ohledně vaší poptávky na Cartop.cz, ale bohužel jsme se vám nedovolali.
          </Text>

          <Text className="text-gray-700 text-base leading-6 mb-3">
            Nic se neděje, zkusíme to znovu při nejbližší příležitosti.
          </Text>

          <Text className="text-gray-700 text-base leading-6 mb-4">
            Děkujeme, <br/> Váš <b>Cartop.cz</b> tým
          </Text>
        </Section>
      </Container>
    </LayoutTransactional>
  );
};

export default ContactConfirmationTemplate;