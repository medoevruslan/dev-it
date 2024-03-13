import React from 'react';
import { FallbackPage } from '@/src/pages/error/fallback';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  error: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children, error } = this.props;

    if (hasError) {
      return (
        <FallbackPage
          error={error}
          resetErrorBoundary={() => this.setState({ hasError: false })}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
