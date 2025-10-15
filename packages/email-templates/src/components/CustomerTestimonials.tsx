import { Section, Text } from "@react-email/components";

export const CustomerTestimonials = () => {
  return (
    <Section className="text-center mt-6 center mx-auto" style={{ maxWidth: "600px" }}>
      <div>
        <Text className="text-[#222831] text-[18px] font-bold text-center">
          Co říkají naši zákazníci
        </Text>

        <Text className="text-[#222831] text-[13px] font-bold text-center m-0 p-0">
          Roman K.
        </Text>
        <Text className="text-[#FF9D00] text-[13px] font-bold text-center  m-0 p-0">
          ★★★★★
        </Text>
        <Text className="text-[#222831] text-[13px] text-center">
          "Naprosto perfektní a profesionální přístup, opravdu zde berou
          klienta tak jak si zaslouží..<br />Rozhodně další vůz budu řešit přes tuto
          společnost."
        </Text>
      </div>

      <div>
        <Text className="text-[#222831] text-[13px] font-bold text-center m-0 p-0">
        Honza K.
        </Text>
        <Text className="text-[#FF9D00] text-[13px] font-bold text-center  m-0 p-0">
          ★★★★★
        </Text>
        <Text className="text-[#222831] text-[13px] text-center">
        "Kupovali jsme do firmy několik aut, CarTop nám vždycky pomohl najít optimální řešení. Velice dobrá komunikace a profesionalita."
        </Text>
      </div>

      <div>
        <Text className="text-[#222831] text-[13px] font-bold text-center m-0 p-0">
        Milan V.
        </Text>
        <Text className="text-[#FF9D00] text-[13px] font-bold text-center  m-0 p-0">
          ★★★★★
        </Text>
        <Text className="text-[#222831] text-[13px] text-center">
        "Když je místo krásných řečí vidět skvělá práce.....za mne naprostá spokojenost...auto objednáno."
        </Text>
      </div>
    </Section>
  );
};

export default CustomerTestimonials;