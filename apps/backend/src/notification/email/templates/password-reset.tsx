import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Heading,
  Hr,
} from '@react-email/components';

export interface PasswordResetEmailProps {
  userName?: string;
  resetLink: string;
  expirationTime?: string;
}

/**
 * Password Reset Email Template
 * Placeholder template for password reset emails
 */
export default function PasswordResetEmail({
  userName = 'User',
  resetLink,
  expirationTime = '1 hour',
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={heading}>Password Reset Request</Heading>

            <Text style={text}>
              Hi {userName},
            </Text>

            <Text style={text}>
              We received a request to reset your password. Click the button below to create a new password:
            </Text>

            <Button style={button} href={resetLink}>
              Reset Password
            </Button>

            <Text style={text}>
              This link will expire in {expirationTime}.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              If you didn't request a password reset, you can safely ignore this email.
              Your password will remain unchanged.
            </Text>

            <Text style={footer}>
              If the button doesn't work, copy and paste this link into your browser:
            </Text>

            <Text style={linkText}>
              {resetLink}
            </Text>
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
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
  margin: '24px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  marginBottom: '8px',
};

const linkText = {
  color: '#5469d4',
  fontSize: '14px',
  lineHeight: '20px',
  wordBreak: 'break-all' as const,
};
