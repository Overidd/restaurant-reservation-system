import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-8 text-red-500">
          <p>Ocurrió un error al cargar las reservas.</p>
          <pre className="text-xs">{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}