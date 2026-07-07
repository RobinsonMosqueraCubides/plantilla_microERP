# GUÍA DEFINITIVA DE ARQUITECTURA: FRONTEND ERP MOCK (MOBILE-FIRST) - V2

## OBJETIVO DEL DOCUMENTO
Este documento contiene especificaciones técnicas e instrucciones atómicas diseñadas para que cualquier agente de Inteligencia Artificial (independientemente de sus capacidades de razonamiento) pueda construir única y exclusivamente la capa de frontend de un ERP genérico y modular. 

Toda la persistencia y lógica transaccional estará emulada en el navegador mediante `localStorage`, simulando latencia real y operaciones relacionales complejas entre productos, proveedores, finanzas, clientes y el punto de venta (POS).

---

## 1. PRINCIPIOS ABSOLUTOS E IMPERATIVOS DE DISEÑO

### 1.1 Filosofía Estricta Mobile-First
El sistema debe estar diseñado pensando primero en pantallas de dispositivos móviles (smartphones/tablets de operarios y vendedores) y escalar hacia escritorio mediante breakpoints controlados.
- **Layout Base:** Uso obligatorio de barras de navegación inferiores (`bottom-nav`) fijos para móviles, convirtiéndose en barras laterales (`sidebar`) en pantallas grandes (`md:`).
- **Zonas de Impacto Táctil:** Botones y elementos interactivos con una altura mínima de `48px` (`h-12`) para evitar errores de pulsación.
- **Componentes Emergentes:** Reemplazar los modales tradicionales de escritorio por paneles deslizantes desde abajo o desde el lateral (`Bottom Sheets` o `Slide-overs`) adaptados para pulgares en pantallas móviles.
- **Grillas Responsivas:** Todo contenedor debe iniciar con `grid-cols-1` por defecto y mutar a `md:grid-cols-2` o `md:grid-cols-3` únicamente en pantallas mayores a 768px.

### 1.2 Reglas para el Agente de IA (Prohibiciones y Límites)
- **Cero Código de Servidor:** Queda prohibido generar código para Express, FastAPI, Django, bases de datos SQL/NoSQL o contenedores Docker de backend.
- **Asincronía Emulada:** Toda llamada a servicios de datos debe devolver un objeto `Promise` y envolverse en un `setTimeout` de entre `300ms` y `600ms` para forzar pantallas de carga (`Loaders/Spinners`) en la interfaz.
- **Límite de Líneas:** Ningún componente visual individual debe exceder las **250 líneas de código**. Si un componente crece, debe subdividirse en sub-componentes atómicos en la misma carpeta del módulo.

---

## 2. ARQUITECTURA DE ARCHIVOS COMPLETA

El agente de IA debe estructurar el proyecto exactamente bajo el siguiente árbol de directorios:

```text
src/
├── core/
│   ├── config/
│   │   └── featureFlags.js      # Activación/Desactivación de módulos
│   └── mock-db/
│       ├── MockEngine.js        # Motor genérico de almacenamiento
│       └── dbInit.js            # Semilla de datos iniciales (Seeding)
├── shared/
│   └── components/
│       ├── Button.jsx           # Botón móvil con estados de carga
│       ├── Input.jsx            # Campos de texto optimizados para teclados móviles
│       ├── BottomSheet.jsx      # Alternativa móvil a modales
│       ├── MobileCard.jsx       # Lista tipo tarjeta para visualización móvil
│       └── DataTable.jsx        # Tabla adaptativa (Card en móvil, Tabla en desktop)
├── layouts/
│   └── AppLayout.jsx            # Layout responsivo (BottomNav + Sidebar)
├── modules/
│   ├── productos/
│   │   ├── components/          # Subcomponentes específicos (StockPorProveedor, etc.)
│   │   ├── pages/               # ListadoMadre.jsx, FormularioMadre.jsx
│   │   ├── services/            # productoService.js (Lógica de descuento multiancla)
│   │   └── types.ts             # Definición de estructuras (opcional/comentarios)
│   ├── pos/
│   │   ├── pages/               # PantallaVentaPOS.jsx (Carrito móvil)
│   │   └── services/            # posService.js (Descuento de stock e inyección a finanzas)
│   ├── finanzas/
│   │   ├── pages/               # ResumenCaja.jsx, HistorialFlujo.jsx
│   │   └── services/            # finanzasService.js
│   └── clientes/
│       ├── pages/               # ControlClientes.jsx, PerfilCliente.jsx
│       └── services/            # clienteService.js
└── App.jsx                      # Enrutador y arranque del sistema
```

---

## 3. ESQUEMAS DE DATOS RELACIONALES (JSON SIMULADO)

Para operar con datos cruzados en `localStorage`, la IA debe estructurar los objetos JSON bajo las siguientes estructuras obligatorias:

### 3.1 Clave: `erp_productos_madre` (Productos Genéricos)
Representa el producto base en su catálogo conceptual (sin importar quién lo provea).
```json
[
  {
    "id": "prod-m-001",
    "sku_madre": "GEN-IPHONE15",
    "nombre": "iPhone 15 128GB (Genérico)",
    "categoria": "Tecnología",
    "descripcion": "Dispositivo móvil Apple de última generación",
    "is_active": true
  }
]
```

### 3.2 Clave: `erp_inventario_proveedores` (Anclaje y Descuento por Proveedor)
Mapea las unidades físicas disponibles de un producto madre desglosadas por su proveedor de origen.
```json
[
  {
    "id": "inv-prov-101",
    "producto_madre_id": "prod-m-001",
    "proveedor_nombre": "Distribuidora LATAM S.A.",
    "stock": 14,
    "precio_costo": 720.00,
    "precio_venta_sugerido": 899.99
  },
  {
    "id": "inv-prov-102",
    "producto_madre_id": "prod-m-001",
    "proveedor_nombre": "Importaciones Oriente",
    "stock": 5,
    "precio_costo": 710.00,
    "precio_venta_sugerido": 895.00
  }
]
```

### 3.3 Clave: `erp_clientes` (Control de Clientes)
```json
[
  {
    "id": "cli-501",
    "nombre": "Juan Pérez",
    "identificacion": "109876543",
    "telefono": "+57 300 123 4567",
    "email": "juan.perez@mail.com",
    "saldo_credito": 0.00
  }
]
```

### 3.4 Clave: `erp_transacciones_finanzas` (Control de Caja y Flujo de Dinero)
```json
[
  {
    "id": "fin-901",
    "tipo": "INGRESO",
    "concepto": "Venta POS - Ticket #1004",
    "monto": 899.99,
    "fecha": "2026-07-06T15:30:22.000Z",
    "metodo_pago": "EFECTIVO"
  }
]
```

---

## 4. INSTRUCCIONES LOGICIALES PASO A PASO (ALGORITMOS FRONTEND)

### PASO 1: Implementación del Motor de Persistencia Relacional
Crear `src/core/mock-db/MockEngine.js`. La IA debe escribir una clase reutilizable que lea de `localStorage` y devuelva promesas asíncronas. Debe incluir métodos CRUD básicos (`getAll`, `getById`, `create`, `update`, `softDelete`).

### PASO 2: Algoritmo de Descuento de Stock por Múltiples Proveedores
Dentro de `src/modules/productos/services/productoService.js`, implementar la función crítica de descuento de inventario. Cuando se vende un producto madre, el frontend debe decidir de qué registro de proveedor descontar las unidades.

**Lógica Algorítmica Requerida para la IA:**
1. Recibir `producto_madre_id` y `cantidad_a_descontar`.
2. Consultar todo el array de `erp_inventario_proveedores` filtrando por `producto_madre_id == id`.
3. Ordenar los registros de los proveedores por estrategia FIFO (Primeros en entrar, primeros en salir según la ID) o por Mayor Stock disponible.
4. Iterar sobre los proveedores:
   * Si el Proveedor A tiene suficiente stock: Restar la cantidad directa del stock del Proveedor A.
   * Si el Proveedor A no tiene suficiente stock pero sí un remanente: Dejar el stock del Proveedor A en `0`, restar lo tomado de la `cantidad_a_descontar` y pasar al Proveedor B para descontar la diferencia.
5. Guardar el estado actualizado en `localStorage`.
6. Si la suma total de stock de todos los proveedores llega a `0`, lanzar una alerta visual de "Sin existencias en canal de proveedores".

### PASO 3: Construcción del Sistema POS Móvil
Crear la vista en `src/modules/pos/pages/PantallaVentaPOS.jsx`.
1. **Interfaz de Usuario:** Un input superior de búsqueda optimizado para lectura de códigos de barra (simulado con teclado) o buscador por nombre de Producto Madre.
2. **Selector de Proveedor en Línea:** Al añadir un producto madre al carrito, desplegar un `BottomSheet` inferior que liste los proveedores disponibles que tienen stock actual del producto seleccionado, mostrando sus diferentes precios de venta para que el usuario elija de cuál proveedor descontar en caliente.
3. **Módulo de Carrito Inferior:** Una barra flotante abajo que muestre `Total ($0.00) - Ver Carrito`. Al pulsarla, se abre un cajón de pantalla completa que detalla la orden.
4. **Vinculación de Cliente:** Un selector rápido conectado al storage de `erp_clientes`.
5. **Procesamiento de Pago (Cierre Transaccional):** Al confirmar la venta, el servicio `posService.js` debe:
   * Ejecutar el Algoritmo de Descuento de Stock por Proveedor (PASO 2).
   * Crear un registro en `erp_transacciones_finanzas` de tipo `INGRESO` con el monto total de la venta.
   * Si se seleccionó un cliente, guardar la ID de la transacción en su historial simulado.

### PASO 4: Implementación del Módulo de Finanzas (Control de Caja)
Crear la vista en `src/modules/finanzas/pages/ResumenCaja.jsx`.
1. Debe leer el array `erp_transacciones_finanzas`.
2. Calcular en tiempo real (mediante selectores de estado o `useMemo` de React) los valores consolidados de:
   * **Ingresos Totales** (Suma de transacciones `INGRESO`).
   * **Egresos Totales** (Suma de transacciones `EGRESO` de compras a proveedores).
   * **Flujo de Caja Neto** (Ingresos menos Egresos).
3. **Formulario de Gasto Rápido:** Un botón flotante `(+)` en la esquina inferior derecha que despliega un formulario móvil express para registrar salidas de dinero manuales (ej. "Pago de servicios", "Compra de insumos urgentes") inyectando inmediatamente un registro `EGRESO` en las finanzas simuladas.

### PASO 5: Control de Clientes y CRM Móvil
Crear la vista en `src/modules/clientes/pages/ControlClientes.jsx`.
1. Listado responsivo basado en tarjetas visuales independientes (`MobileCard`). Cada tarjeta muestra el Nombre del cliente, su Teléfono con un botón de llamada directa (`href="tel:..."`) y un indicador visual de su estado crediticio.
2. Formulario de registro rápido adaptado para entrada táctil con validación estricta de campos.

### PASO 6: Inicialización del Sistema (Data Seeding)
Escribir el script `src/core/mock-db/dbInit.js`. Al cargar la aplicación por primera vez en el navegador del cliente, debe validar si las claves de almacenamiento de datos están limpias. De ser así, debe inyectar automáticamente un conjunto de datos consistente (Mínimo 3 productos madre, cada uno enlazado a 2 proveedores distintos con stocks variables, 2 clientes de prueba y un historial inicial de 3 transacciones financieras).

---

## 5. CHECKLIST DE CONFORMIDAD PARA LA IA EJECUTORA
Antes de dar el código por finalizado, la IA debe autoverificar que:
* [ ] No ha importado ni hecho referencias a librerías de backend reales (`express`, `mongoose`, `cors`, `dotenv`).
* [ ] Todos los botones de acción (`Pagar`, `Guardar`, `Descontar`) implementan un estado visual inhabilitado (`disabled`) y muestran un spinner mientras se resuelve la promesa de tiempo controlada.
* [ ] La interfaz se adapta perfectamente a una pantalla móvil de 360px de ancho sin generar scroll horizontal indeseado.
* [ ] Los formularios limpian sus estados y cierran los paneles inferiores correctamente tras disparar los eventos simulados en el almacenamiento local.
