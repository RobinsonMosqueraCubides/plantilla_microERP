import { useState, createContext, useContext } from 'react';

const translations = {
  es: {
    app_name: 'microERP',
    welcome: 'Bienvenido a microERP',
    tagline: 'Plantilla de gestión y POS móvil y responsivo',
    loading: 'Cargando...',
    currency: 'USD',
    products: 'Productos',
    pos: 'Punto de Venta',
    finances: 'Finanzas',
    clients: 'Clientes',
  },
  en: {
    app_name: 'microERP',
    welcome: 'Welcome to microERP',
    tagline: 'Mobile-friendly responsive management & POS template',
    loading: 'Loading...',
    currency: 'USD',
    products: 'Products',
    pos: 'Point of Sale',
    finances: 'Finances',
    clients: 'Clients',
  },
  pt: {
    app_name: 'microERP',
    welcome: 'Bem-vindo ao microERP',
    tagline: 'Modelo de gestão e POS móvel e responsivo',
    loading: 'Carregando...',
    currency: 'USD',
    products: 'Produtos',
    pos: 'Ponto de Venda',
    finances: 'Finanças',
    clients: 'Clientes',
  }
};

const I18nContext = createContext();

export function I18nProvider({ children, defaultLocale = 'es' }) {
  const [locale, setLocale] = useState(defaultLocale);

  const t = (key) => {
    return translations[locale]?.[key] || translations['es']?.[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
