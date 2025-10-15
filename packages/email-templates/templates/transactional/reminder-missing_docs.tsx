import { Container, Heading, Hr, Img, Section, Text } from "@react-email/components";
import { LayoutTransactional } from "../../src/components/layouts/transactional";

interface ReminderMissingDocsProps {
  recipientName?: string;
  warningText?: string;
}

export const ReminderMissingDocsTemplate = ({
  warningText = "Upozorňujeme také, že se jedná o obrátkové zboží a dostupnost konkrétní nabídky nemusí být časem zaručena.",
}: ReminderMissingDocsProps) => {
  return (
    <LayoutTransactional title="Požadujeme doplnění podkladů">
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
            Bez podkladů nemůžeme pokračovat
          </Heading>

          <Text className="text-gray-700 text-base leading-6 mb-3">Dobrý den,</Text>

          <Text className="text-gray-700 text-base leading-6 mb-3">před nějakou dobou jsme Vás požádali o doložení podkladů potřebných pro schválení leasingu. Zatím jsme je od Vás neobdrželi, proto bychom Vás chtěli požádat o jejich zaslání co nejdříve.</Text>

          <Text className="text-gray-700 text-base leading-6 mb-3">Bez kompletních dokumentů bohužel nemůžeme v procesu pokračovat.</Text>

          <Section>
            <Hr />
            <Text className="text-center" style={{ color: '#C90932', fontWeight: 700 }}>{warningText}</Text>
            <Hr />
          </Section>

          <Text className="text-gray-700 text-base leading-6 mb-3">Pokud jste již podklady odeslal(a), berte prosím tento e-mail jako bezpředmětný.</Text>

          <Text className="text-gray-700 text-base leading-6 mb-3">Pokud potřebujete s čímkoli pomoc nebo si nejste jistý(á), jaké dokumenty je třeba dodat, neváhejte nás kontaktovat.</Text>

          <Text className="text-gray-700 text-base leading-6 mb-4">Děkujeme, <br/> Váš <b>Cartop.cz</b> tým</Text>
        </Section>
      </Container>
    </LayoutTransactional>
  );
};

export default ReminderMissingDocsTemplate;
