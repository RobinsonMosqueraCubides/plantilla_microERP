# ARCHITECTURE_GUIDE.md

# Starter Kit Full Stack (React + FastAPI)

## Objetivo
Construir una plantilla reutilizable para desarrollar ERPs, CRMs y aplicaciones empresariales, separando completamente la infraestructura de la lógica del negocio.

## Filosofía
- El Core nunca depende del negocio.
- La lógica específica vive en módulos.
- Reutilizar antes de crear.
- Arquitectura modular.
- Mobile First.
- Código desacoplado.

# Arquitectura General

```
monorepo/
├── frontend/
├── backend/
├── docs/
├── templates/
└── docker/
```

## Backend

```
backend/
├── core/
│   ├── auth/
│   ├── config/
│   ├── database/
│   ├── middleware/
│   ├── security/
│   ├── logger/
│   └── exceptions/
├── common/
│   ├── utils/
│   ├── pagination/
│   ├── filters/
│   ├── upload/
│   └── responses/
├── modules/
├── services/
├── repositories/
├── tasks/
└── tests/
```

### Core
Contiene autenticación, configuración, seguridad, base de datos y excepciones. Nunca depende del negocio.

### Common
Componentes reutilizables: respuestas, filtros, utilidades, paginación y carga de archivos.

### Modules
Cada negocio se implementa aquí.

Ejemplos:

```
modules/
    streaming/
    taller/
    inventario/
    clinica/
    inmobiliaria/
```

Cada módulo debe contener:

```
models.py
schemas.py
repository.py
service.py
router.py
tests/
```

## Frontend

```
frontend/
├── core/
├── shared/
├── components/
├── layouts/
├── modules/
├── hooks/
├── services/
├── themes/
└── assets/
```

Cada módulo:

```
components/
pages/
hooks/
services/
types/
routes/
```

# Componentes reutilizables

Crear únicamente componentes genéricos:

- Card
- Table
- DataGrid
- Button
- Modal
- Drawer
- Input
- Select
- Pagination
- SearchBar
- ConfirmDialog

Nunca crear componentes con nombres del negocio.

# CRUD Genérico

Todos los módulos deben reutilizar:

- BaseRepository
- BaseService
- BaseCRUD
- DataTable
- Formularios reutilizables
- Filtros
- Paginación

# Sistema de Autenticación

Debe soportar:

- Login
- JWT
- Refresh Token
- Logout
- Recuperación de contraseña

# Roles y permisos

Modelo obligatorio:

- Usuarios
- Roles
- Permisos

Nunca asumir un único administrador.

# Feature Flags

Implementar configuración por funcionalidades.

Ejemplo:

```
FEATURE_WHATSAPP=True
FEATURE_REPORTS=True
FEATURE_FINANCE=True
FEATURE_MULTI_BRANCH=False
FEATURE_NOTIFICATIONS=False
```

# Configuración por cliente

Tabla Settings:

- Empresa
- Logo
- Moneda
- Idioma
- Zona horaria
- Color principal
- Color secundario
- Módulos activos

# Dashboard

Debe ser configurable mediante widgets.

Ejemplos:

- Ventas
- Inventario
- Compras
- Clientes
- Utilidad
- Productos

# Notificaciones

Implementar un NotificationService.

Canales:

- Email
- WhatsApp
- SMS
- Push
- Telegram

# Sistema de archivos

Servicio reutilizable para:

- PDF
- Excel
- Imágenes
- Contratos
- Adjuntos

# Auditoría

Registrar:

- Usuario
- Fecha
- Acción
- Cambios
- IP

# Logs

Registrar:

- Inicio de sesión
- Creación
- Eliminación
- Exportaciones
- Errores

# Internacionalización

Preparar estructura:

```
i18n/
es/
en/
pt/
```

# Variables de entorno

```
APP_NAME
APP_VERSION
CLIENT_NAME
DATABASE_URL
JWT_SECRET
LOG_LEVEL
SMTP
SUPABASE
STORAGE
```

# Flujo de capas

```
Router
 ↓
Service
 ↓
Repository
 ↓
Database
```

Nunca acceder a la base de datos desde Router.

# Reglas para Agentes IA

- No duplicar lógica.
- Reutilizar componentes existentes.
- Toda lógica de negocio en Services.
- Repository solo accede a la BD.
- No escribir SQL en Router.
- Documentar endpoints con OpenAPI.
- Todo módulo debe incluir pruebas.
- Componentes React menores a 300 líneas cuando sea posible.
- Separar páginas, hooks, servicios y componentes.

# Plantilla para crear un módulo

1. Crear carpeta en modules.
2. Crear models.py.
3. Crear schemas.py.
4. Crear repository.py.
5. Crear service.py.
6. Crear router.py.
7. Crear pruebas.
8. Registrar rutas.
9. Registrar permisos.
10. Crear componentes React.
11. Actualizar documentación.

# Buenas prácticas

- SOLID
- DRY
- KISS
- Clean Architecture
- Dependency Injection
- Tipado estricto
- Validaciones centralizadas
- Manejo uniforme de errores

# Checklist

Antes de finalizar un módulo verificar:

- Modelos creados.
- Esquemas creados.
- Servicios creados.
- Repositorios creados.
- Endpoints documentados.
- Pruebas implementadas.
- Permisos configurados.
- Frontend conectado.
- Variables de entorno documentadas.
- Documentación actualizada.

Este documento constituye la guía base para cualquier nuevo proyecto desarrollado con React + FastAPI y está diseñado para ser utilizado como contexto inicial por agentes de IA como Codex, Claude Code, Gemini CLI o similares.
