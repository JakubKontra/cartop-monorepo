'use client';

import { Component, type ReactNode } from 'react';

import { PromotionalOffersSectionError } from './PromotionalOffersSectionError';

interface PromotionalOffersSectionWrapperProps {
  children: ReactNode;
}

interface PromotionalOffersSectionWrapperState {
  error?: Error;
  hasError: boolean;
}

export class PromotionalOffersSectionWrapper extends Component<
  PromotionalOffersSectionWrapperProps,
  PromotionalOffersSectionWrapperState
> {
  constructor(props: PromotionalOffersSectionWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): PromotionalOffersSectionWrapperState {
    return { error, hasError: true };
  }

  reset = () => {
    this.setState({ error: undefined, hasError: false });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return <PromotionalOffersSectionError error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}
