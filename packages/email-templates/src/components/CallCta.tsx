import { Section, Text } from "@react-email/components";
import Button from "./Button";

export const CallCta = () => {
  return (
  <Section className="text-center mt-6 center px-4 py-8 bg-[#EFEFEF] mx-auto" style={{ borderRadius: '28px'}}>
      <Text className="text-[#222831] text-[18px] font-bold text-center m-0 p-0 mb-6">
        Chcete nám zavolat?
      </Text>

      <Text>
        Naši kolegové se Vám budou věnovat <br />
        každý všední den od 9:00 - 18:00 hod.
      </Text>

      <div className="mx-auto" style={{ width: '260px' }}>
        <Button href="tel:+420608599607" fullWidth style={{ backgroundColor: '#FFFFFF', color: '#222831', border: 'none', fontWeight: '800' }}>
          +420 604 544 776
        </Button>
      </div>
    </Section>
  );
};

export default CallCta;
