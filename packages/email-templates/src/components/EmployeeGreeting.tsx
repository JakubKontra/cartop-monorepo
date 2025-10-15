import { Img, Link, Section, Text } from "@react-email/components";

export const EmployeeGreeting = () => {
  return ( <Section className="px-8 py-3 mb-4 border-t border-gray-200">

<div className="flex flex-col">
      <Text className="text-sm text-gray-600 mb-1">
          Pro jakékoliv dotazy se na mě obraťte:
        </Text>
      </div>
    <div className="flex items-center">
      <div className="flex items-center">
      <Img
        src="https://ui-avatars.com/api/?name=Jakub+Kontra&size=80&background=f3f4f6&color=333"
        width="80"
        height="80"
        alt="Jakub Kontra"
        className="rounded-full border-2 border-gray-200"
      />
      <div className="ml-5">
        <Text className="text-lg font-bold text-gray-800 m-0">
          Jakub Kontra
        </Text>
        
        <Text className="text-sm text-gray-600 m-0">
          Tel:{" "}
          <Link
            href="tel:+420608599607"
            className="text-cartop-orange no-underline"
          >
            +420 608 599 607
          </Link>
          <br />
          Email:{" "}
          <Link
            href="mailto:info@cartop.cz"
            className="text-cartop-orange no-underline"
          >
            info@cartop.cz
          </Link>
        </Text>
      </div>
      </div>
    </div>
  </Section>);
};