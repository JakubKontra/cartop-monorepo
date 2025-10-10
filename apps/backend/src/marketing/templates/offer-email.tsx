import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from '@react-email/components';

export interface OfferData {
  id: string;
  title: string;
  description?: string;
  price?: string;
  imageUrl?: string;
}

export interface OfferEmailProps {
  offers: OfferData[];
  title?: string;
  subtitle?: string;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Offer Email Template
 * Placeholder template for marketing emails with offers
 * TODO: Replace with actual design when provided
 */
export default function OfferEmail({
  offers = [],
  title = 'Check Out Our Latest Offers',
  subtitle = 'Exclusive deals just for you',
  metadata,
}: OfferEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>{title}</Heading>

            {subtitle && (
              <Text style={subtitleText}>{subtitle}</Text>
            )}

            <Hr style={hr} />

            {offers.length === 0 ? (
              <Text style={text}>No offers available at this time.</Text>
            ) : (
              offers.map((offer, index) => (
                <Section key={offer.id} style={offerSection}>
                  <Heading as="h2" style={offerHeading}>
                    {offer.title}
                  </Heading>

                  {offer.description && (
                    <Text style={text}>{offer.description}</Text>
                  )}

                  {offer.price && (
                    <Text style={priceText}>{offer.price}</Text>
                  )}

                  <Text style={offerIdText}>Offer ID: {offer.id}</Text>

                  {index < offers.length - 1 && <Hr style={hr} />}
                </Section>
              ))
            )}

            <Hr style={hr} />

            <Text style={footer}>
              This is a placeholder template. Replace with your actual email design.
            </Text>

            {metadata && (
              <Text style={metadataText}>
                Template generated on {new Date().toISOString()}
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const section = {
  padding: '0 48px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  marginBottom: '16px',
};

const subtitleText = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#666666',
  marginTop: '0',
  marginBottom: '24px',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const offerSection = {
  marginTop: '24px',
  marginBottom: '24px',
};

const offerHeading = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '600',
  color: '#484848',
  marginTop: '0',
  marginBottom: '12px',
};

const priceText = {
  fontSize: '20px',
  lineHeight: '1.4',
  fontWeight: '700',
  color: '#5469d4',
  marginTop: '8px',
  marginBottom: '8px',
};

const offerIdText = {
  fontSize: '12px',
  lineHeight: '1.4',
  color: '#8898aa',
  marginTop: '4px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '32px',
  marginBottom: '8px',
};

const metadataText = {
  color: '#cccccc',
  fontSize: '12px',
  lineHeight: '16px',
  marginTop: '16px',
};
