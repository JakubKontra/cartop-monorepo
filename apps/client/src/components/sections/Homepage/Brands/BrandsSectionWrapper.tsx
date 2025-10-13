'use client';

import { Component, type ReactNode } from 'react';

import { BrandsSectionError } from './BrandsSectionError';

interface BrandsSectionWrapperProps {
  children: ReactNode;
}

interface BrandsSectionWrapperState {
  error?: Error;
  hasError: boolean;
}

export class BrandsSectionWrapper extends Component<
  BrandsSectionWrapperProps,
  BrandsSectionWrapperState
> {
  constructor(props: BrandsSectionWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): BrandsSectionWrapperState {
    return { error, hasError: true };
  }

  reset = () => {
    this.setState({ error: undefined, hasError: false });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return <BrandsSectionError error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}
