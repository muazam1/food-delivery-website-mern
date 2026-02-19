import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-gray-50 rounded-3xl border border-gray-200 m-8">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong.</h2>
                    <p className="text-gray-500 mb-6 max-w-md">
                        We're sorry, but the application encountered an unexpected error.
                        Please try refreshing the page.
                    </p>
                    <details className="text-left bg-white p-4 rounded-xl border border-gray-200 text-xs font-mono text-red-500 overflow-auto max-w-full w-full mb-6">
                        <summary className="cursor-pointer font-bold mb-2">Error Details</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-goldfinger text-lead font-bold rounded-xl hover:bg-lead hover:text-white transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
