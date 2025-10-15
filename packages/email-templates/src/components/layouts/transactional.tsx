import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { ReactNode } from "react";
import { Footer } from "../parts/Footer";
import { CustomerTestimonials } from "../CustomerTestimonials";

export const LayoutTransactional = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Html>
      <Preview>{title}</Preview>
      <Tailwind
        config={{
          darkMode: 'media',
          theme: {
            extend: {
              colors: {
                cartop: {
                  teal: "#169179",
                  orange: "#F23207",
                  red: "#C90932",
                  gray: {
                    light: "#F1F1F1",
                    border: "#E5E5E5",
                    text: "#6B6B6B",
                    footer: "#64697A",
                  },
                },
              },
              fontFamily: {
                verdana: ["Verdana", "sans-serif"],
              },
            },
          },
        }}
      >
        <Head />
        <Body className="bg-[#F5F5F5] font-verdana">
          {children}
          <Footer />
        </Body>
      </Tailwind>
    </Html>
  );
};
