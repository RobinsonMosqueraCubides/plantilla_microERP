import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const showLoading = (message = '') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };

  /**
   * Ejecuta una función asíncrona controlando automáticamente el estado de carga.
   * @param {Function} asyncFn - Función que retorna una promesa
   * @param {string} message - Mensaje de carga opcional
   */
  const withLoading = async (asyncFn, message = '') => {
    showLoading(message);
    try {
      return await asyncFn();
    } finally {
      hideLoading();
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage, showLoading, hideLoading, withLoading }}>
      {children}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)', // Fondo oscuro traslúcido
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          color: '#ffffff',
          backdropFilter: 'blur(4px)', // Desenfoque premium
          fontFamily: 'var(--font-heading)'
        }}>
          {/* Spinner Premium de Carga */}
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderTop: '4px solid var(--color-accent)', // Color verde de acento
            borderRadius: '50%',
            animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            marginBottom: 'var(--space-4)'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          {loadingMessage && (
            <p style={{
              fontSize: '1rem',
              fontWeight: '500',
              animation: 'pulse 1.5s infinite',
              letterSpacing: '0.05em'
            }}>
              {loadingMessage}
            </p>
          )}
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
