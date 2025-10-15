import {
  Container,
  Img,
} from "@react-email/components";
import { LayoutTransactional } from "../src/components/layouts/transactional";

export const BasicTemplate = () => {
  return (
    <LayoutTransactional title="Basic Template">
      <Container className="mx-auto max-w-2xl bg-white rounded-lg border border-gray-200">
      <Img
            src="https://cartop.madebykontra.com/emails/v2/icon-error-email@2x.png"
            alt="Cartop"
            className="mx-auto h-[28px] w-auto"
          />
           <Img
            src="https://cartop.madebykontra.com/emails/v2/icon-success-email@2x.png"
            alt="Cartop"
            className="mx-auto h-[28px] w-auto"
          />

      </Container>
    </LayoutTransactional>
  );
};

export default BasicTemplate;
