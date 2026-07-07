import { I18nProvider, useI18n } from './core/config/i18n';
import { FEATURE_FLAGS } from './core/config/featureFlags';

function MainApp() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="mobile-container">
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ color: 'var(--color-accent)', fontSize: '2.5rem' }}>{t('app_name')}</h1>
        <p style={{ color: 'var(--color-secondary)' }}>{t('tagline')}</p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: 'var(--space-4)',
          borderRadius: 'var(--space-2)',
          border: '1px solid var(--color-border)'
        }}>
          <h2 style={{ color: 'var(--color-primary)' }}>{t('welcome')}</h2>
          <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-secondary)' }}>
            Esta es la pantalla inicial de la plantilla. Los módulos activos son:
          </p>
          <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-4)', color: 'var(--color-foreground)' }}>
            <li>{t('products')}: Activo</li>
            <li>{t('pos')}: Activo</li>
            <li>{t('finances')}: {FEATURE_FLAGS.FINANCE ? 'Activo' : 'Inactivo'}</li>
            <li>{t('clients')}: Activo</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
          <button 
            style={{
              flex: 1,
              backgroundColor: locale === 'es' ? 'var(--color-primary)' : 'var(--color-muted)',
              color: locale === 'es' ? 'var(--color-on-primary)' : 'var(--color-foreground)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--space-2)',
              fontWeight: '500'
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
              fontWeight: '500'
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
              fontWeight: '500'
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
      <MainApp />
    </I18nProvider>
  );
}
