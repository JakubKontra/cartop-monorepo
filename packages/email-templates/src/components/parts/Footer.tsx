import { Column, Container, Img,  Link, Row, Section, Text } from "@react-email/components";

export const Footer = () => {
  return (
    <Container className="mx-auto max-w-2xl mt-2 px-6">
    <Text
      className="text-center text-xs leading-5 mb-4"
      style={{ color: "#64697A" }}
    >
      Provozovatelem portálu <b>Cartop.cz</b> je společnost <b>CTO Group, s.r.o.</b>
      <br />
      IČ 089 888 20, Hornokrčská 1947/2 Praha 4, 140 00
      <br />
      <Link
        href="mailto:info@cartop.cz"
        className="underline"
        style={{ color: "#C90932" }}
      >
        {" "}
        +420 604 544 776
      </Link>{" "}
      |{" "}
      <Link
        href="mailto:info@cartop.cz"
        className="underline"
        style={{ color: "#C90932" }}
      >
        info@cartop.cz
      </Link>
      <br />
      <Link
        href="https://www.cartop.cz/jak-to-funguje"
        className="underline"
        style={{ color: "#C90932" }}
      >
        www.cartop.cz/jak-to-funguje
      </Link>
    </Text>

    <Text
      className="text-center text-xs leading-5 mb-4"
      style={{ color: "#64697A" }}
    >
      Právní informace: Tento e-mail a všechny připojené soubory (i)
      jsou důvěrné a mohou být chráněny zákonem a (ii) nejsou návrhem na
      uzavření smlouvy ani jeho přijetím. Tento e-mail je určen pouze
      uvedenému příjemci a dalším osobám, které jsou jmenovitě uvedeny
      jako příjemci. Jestliže nejste oprávněný příjemce, pak jakákoliv
      forma zveřejnění, reprodukce, kopírování, distribuce nebo šíření
      je přísně zakázána.
    </Text>

    <Text className="text-center text-xs" style={{ color: "#64697A" }}>
      Nechcete už odebírat naše e-maily?{" "}
      <Link href="#" className="underline" style={{ color: "#64697A" }}>
        Odhlaste se zde
      </Link>
      .
    </Text>
  </Container>
  );
};
