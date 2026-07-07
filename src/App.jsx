import React, { useEffect, useState } from 'react';
import { I18nProvider, useI18n } from './core/config/i18n';
import { FEATURE_FLAGS } from './core/config/featureFlags';
import { LoadingProvider, useLoading } from './shared/components/LoadingContext';
import { MockEngine } from './core/mock-db/MockEngine';

function MainApp() {
  const { t, locale, setLocale } = useI18n();
  const { withLoading } = useLoading();
  const [productos, setProductos] = useState([]);

  // Fetch productos de la DB simulada
  const fetchProductos = async () => {
    await withLoading(async () => {
      const data = await MockEngine.getAll('erp_productos_madre');
      setProductos(data);
    }, t('loading'));
  };

  useEffect(() => {
    fetchProductos();
  }, [locale]); // Recargar si cambia locale

  return (
    <div className="mobile-container">
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ color: 'var(--color-accent)', fontSize: '2.25rem' }}>{t('app_name')}</h1>
        <p style={{ color: 'var(--color-secondary)' }}>{t('tagline')}</p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: 'var(--space-4)',
          borderRadius: 'var(--space-2)',
          border: '1px solid var(--color-border)'
        }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>{t('welcome')}</h2>
          <p style={{ color: 'var(--color-secondary)' }}>
            Los módulos activos son:
          </p>
          <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-4)', color: 'var(--color-foreground)' }}>
            <li>{t('products')}: Activo</li>
            <li>{t('pos')}: Activo</li>
            <li>{t('finances')}: {FEATURE_FLAGS.FINANCE ? 'Activo' : 'Inactivo'}</li>
            <li>{t('clients')}: Activo</li>
          </ul>
        </div>

        {/* Sección de Productos Sembrados */}
        <div>
          <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
            {t('products')} Sembrados (Mock DB)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {productos.length === 0 ? (
              <p style={{ color: 'var(--color-secondary)' }}>No hay productos cargados.</p>
            ) : (
              productos.map((prod) => (
                <div 
                  key={prod.id} 
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--space-2)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <h4 style={{ color: 'var(--color-foreground)', fontWeight: '600' }}>{prod.nombre}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', marginTop: 'var(--space-1)' }}>
                    SKU: {prod.sku_madre} | Categoría: {prod.categoria}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-foreground)', marginTop: 'var(--space-2)' }}>
                    {prod.descripcion}
                  </p>
                </div>
              ))
            )}
          </div>
          <button
            onClick={fetchProductos}
            style={{
              marginTop: 'var(--space-4)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--space-2)',
              fontWeight: '600',
              width: '100%',
              textAlign: 'center',
              border: 'none'
            }}
          >
            Refrescar Productos
          </button>
        </div>

        {/* Selector de idioma */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
          <button 
            style={{
              flex: 1,
              backgroundColor: locale === 'es' ? 'var(--color-primary)' : 'var(--color-muted)',
              color: locale === 'es' ? 'var(--color-on-primary)' : 'var(--color-foreground)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--space-2)',
              fontWeight: '500',
              border: 'none'
            }}
            onClick={() => setLocale('es')}
          >
            Español
          </button>
          <button 
            style={{
              flex: 1,
              backgroundColor: locale === 'en' ? 'var(--color-primary)' : 'var(--color-muted)',
              color: locale === 'en' ? 'var(--color-on-primary)' : 'var(--color-foreground)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--space-2)',
              fontWeight: '500',
              border: 'none'
            }}
            onClick={() => setLocale('en')}
          >
            English
          </button>
          <button 
            style={{
              flex: 1,
              backgroundColor: locale === 'pt' ? 'var(--color-primary)' : 'var(--color-muted)',
              color: locale === 'pt' ? 'var(--color-on-primary)' : 'var(--color-foreground)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--space-2)',
              fontWeight: '500',
              border: 'none'
            }}
            onClick={() => setLocale('pt')}
          >
            Português
          </button>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider defaultLocale="es">
      <LoadingProvider>
        <MainApp />
      </LoadingProvider>
    </I18nProvider>
  );
}
