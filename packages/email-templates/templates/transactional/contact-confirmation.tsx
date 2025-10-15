import { Container, Heading, Hr, Img, Section, Text } from "@react-email/components";
import { LayoutTransactional } from "../../src/components/layouts/transactional";


export const ContactConfirmationTemplate = () => {
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
          <Heading className="text-lg text-gray-800 font-bold" style={{ fontSize: 18, marginBottom: 8 }}>
            Děkujeme! Ozveme se vám co nejdříve.
          </Heading>

          <Text className="text-gray-700 text-base leading-6 mb-3">Váš kontakt jsme přijali a náš tým se vám ozve telefonicky, jakmile budeme mít prostor. Obvykle voláme během pracovního dne mezi 9:00 a 17:00.</Text>

          <Text className="text-gray-700 text-base leading-6 mb-3">Pokud vás nezastihneme, pošleme vám SMS nebo e-mail, abychom se domluvili na vhodnějším termínu hovoru.</Text>

          <Text className="text-gray-700 text-base leading-6 mb-4">Děkujeme, <br/> Váš <b>Cartop.cz</b> tým</Text>
        </Section>
      </Container>
    </LayoutTransactional>
  );
};

export default ContactConfirmationTemplate;
