'use client';

import { Component, type ReactNode } from 'react';

import { AllBrandsSectionError } from './AllBrandsSectionError';

interface AllBrandsSectionWrapperProps {
  children: ReactNode;
}

interface AllBrandsSectionWrapperState {
  error?: Error;
  hasError: boolean;
}

export class AllBrandsSectionWrapper extends Component<
  AllBrandsSectionWrapperProps,
  AllBrandsSectionWrapperState
> {
  constructor(props: AllBrandsSectionWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): AllBrandsSectionWrapperState {
    return { error, hasError: true };
  }

  reset = () => {
    this.setState({ error: undefined, hasError: false });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return <AllBrandsSectionError error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}
