# Roadmap de Desarrollo: Plantilla microERP

Este documento consolida las tareas y fases de desarrollo basadas en `ARCHITECTURE_GUIDE.md` (adaptado exclusivamente al Frontend) y `planning_frontend.md` (Frontend Mock Mobile-First). Sirve como guía atómica y TODO list para seguir la evolución del proyecto.

## Fase 1: Configuración Inicial y Base del Proyecto [🟢 Fácil]
- [x] Inicializar estructura del repositorio (`src/`, `docs/`, `public/`).
- [x] Configurar variables de entorno y preparar el soporte base para i18n (`es/`, `en/`, `pt/`).
- [x] Configurar motor base de React (Vite/Next.js) siguiendo rígidamente el paradigma Mobile-First.
- [x] Crear el andamiaje estricto de carpetas en el frontend (`src/core`, `src/shared`, `src/layouts`, `src/modules`).

## Fase 2: Motor de Persistencia (Mock LocalStorage) [🟡 Medio]
- [x] Implementar `src/core/mock-db/MockEngine.js` con métodos CRUD asíncronos (`getAll`, `getById`, `create`, `update`, `softDelete`) y delay simulado (300ms-600ms).
- [x] Crear el script de inicialización de datos (`src/core/mock-db/dbInit.js`) con semillas iniciales (3 productos, 2 proveedores por producto, 2 clientes, 3 transacciones).
- [x] Definir estado global o contexto para gestionar las cargas asíncronas de la UI (Loaders/Spinners) de forma transparente.

## Fase 3: Componentes UI Compartidos (Mobile-First) [🟡 Medio]
- [ ] `Button.jsx`: Botón móvil (altura mínima 48px) con estados integrados de `disabled`/`loading`.
- [ ] `Input.jsx`: Campos de texto amplios y optimizados para teclados virtuales de teléfonos.
- [ ] `BottomSheet.jsx`: Paneles deslizantes inferiores como alternativa exclusiva a los modales de escritorio.
- [ ] `MobileCard.jsx`: Estructura tipo tarjeta diseñada específicamente para listados móviles.
- [ ] `DataTable.jsx`: Tabla inteligente (Renderiza `MobileCard` en pantallas chicas, `Table` normal en desktop).
- [ ] `AppLayout.jsx`: Layout responsivo (`bottom-nav` fijo en móvil, transformable a `sidebar` a partir de `md:`).
- [ ] Sistema de "Feature Flags" (`src/core/config/featureFlags.js`) para encender/apagar módulos.

## Fase 4: Autenticación, Roles y Configuración Cliente [🟢 Fácil]
- [ ] Módulo de Autenticación: Flujo de Login, Refresh (Simulado), Logout y Recuperación.
- [ ] Gestión de Roles: Definición de Usuarios, Roles y Permisos básicos.
- [ ] Tabla de Configuración de Tenant (Empresa, Logo, Moneda, Color principal, Módulos activos).

## Fase 5: Módulo de Productos e Inventario [🔴 Alto]
- [ ] Vistas de CRUD (`ListadoMadre.jsx`, `FormularioMadre.jsx`) orientadas a `erp_productos_madre`.
- [ ] Vistas de gestión de unidades/costos por proveedor (`erp_inventario_proveedores`).
- [ ] Implementar en `productoService.js` la función de **algoritmo de descuento de stock** iterativo entre múltiples proveedores (Estrategia FIFO).

## Fase 6: Módulo POS (Punto de Venta) Móvil [🔴 Alto]
- [ ] Construir vista `PantallaVentaPOS.jsx` con caja superior de búsqueda fluida para escáner/teclado.
- [ ] Integrar el selector rápido de proveedor (BottomSheet) al detectar un producto en el carrito con stock.
- [ ] Módulo flotante inferior ("Total $X - Ver Carrito") desplegando a pantalla completa.
- [ ] Selector táctil rápido para vinculación de clientes a la compra.
- [ ] Acción de **Pago Transaccional** en `posService.js`: Descontar stock real, guardar en `erp_transacciones_finanzas` (INGRESO) y registrar en cliente.

## Fase 7: Módulo de Finanzas (Control de Caja) [🟡 Medio]
- [ ] Construir vista `ResumenCaja.jsx` y `HistorialFlujo.jsx`.
- [ ] Implementar sumatorias en tiempo real (Ingresos Totales, Egresos, Flujo Neto) basadas en `erp_transacciones_finanzas`.
- [ ] Botón Flotante (FAB) para registro Express de Salidas de dinero (EGRESOS directos por pagos u otros).

## Fase 8: Módulo de Clientes (CRM Móvil) [🟢 Fácil]
- [ ] Construir vista `ControlClientes.jsx` usando `MobileCard`.
- [ ] Mostrar en tarjeta: Nombre, Teléfono (`href="tel:..."`), y estado/saldo crediticio.
- [ ] Vista `PerfilCliente.jsx` y un formulario tipo BottomSheet rápido para creación manual.

## Fase 9: Features Transversales y Auditoría [🟡 Medio]
- [ ] Dashboard principal dinámico usando Widgets base (Ventas, Inventario, Utilidades).
- [ ] Sistema genérico y centralizado de Logs / Auditoría (Usuario, Fecha, Acción).
- [ ] Módulo simulado de notificaciones multiplataforma (Email, WP).
- [ ] Sistema simulado de subida de archivos (Contratos, Imágenes, Adjuntos).

## Fase 10: Revisión Rigurosa de Calidad Frontend (Checklist Final) [🟢 Fácil]
- [ ] Ningún archivo de UI excede el límite atómico de las **250 líneas de código**.
- [ ] Cero dependencias reales o rastros de backend (`express`, `dotenv`, librerías DB).
- [ ] Adaptabilidad perfecta probada en simulador de **360px** de ancho (cero scroll horizontal).
- [ ] Formularios resetean estados y cierran paneles automáticamente al cumplir su promesa.
- [ ] Todo botón que llama al MockEngine desactiva doble pulsación visualizando Spinner.
