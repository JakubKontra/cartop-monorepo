'use client';

import { Component, type ReactNode } from 'react';

import { HighlightedBrandsSectionError } from './HighlightedBrandsSectionError';

interface HighlightedBrandsSectionWrapperProps {
  children: ReactNode;
}

interface HighlightedBrandsSectionWrapperState {
  error?: Error;
  hasError: boolean;
}

export class HighlightedBrandsSectionWrapper extends Component<
  HighlightedBrandsSectionWrapperProps,
  HighlightedBrandsSectionWrapperState
> {
  constructor(props: HighlightedBrandsSectionWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): HighlightedBrandsSectionWrapperState {
    return { error, hasError: true };
  }

  reset = () => {
    this.setState({ error: undefined, hasError: false });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return <HighlightedBrandsSectionError error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}
