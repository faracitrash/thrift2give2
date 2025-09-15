import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('KariaKita Error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center shadow-lg mx-auto mb-6">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, ada masalah saat memuat aplikasi KariaKita. 
              Silakan refresh halaman atau coba lagi nanti.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
            >
              🔄 Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize React App
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Development hot reload
if (import.meta.hot) {
  import.meta.hot.accept();
}
