const initialProductosMadre = [
  {
    id: "prod-m-001",
    sku_madre: "GEN-IPHONE15",
    nombre: "iPhone 15 128GB (Genérico)",
    categoria: "Tecnología",
    descripcion: "Dispositivo móvil Apple de última generación",
    is_active: true,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "prod-m-002",
    sku_madre: "GEN-SAMS24",
    nombre: "Samsung Galaxy S24 (Genérico)",
    categoria: "Tecnología",
    descripcion: "Smartphone insignia de Samsung",
    is_active: true,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "prod-m-003",
    sku_madre: "GEN-HEADPHONES",
    nombre: "Audífonos Inalámbricos Pro (Genérico)",
    categoria: "Audio",
    descripcion: "Audífonos con cancelación de ruido activa",
    is_active: true,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const initialInventarioProveedores = [
  {
    id: "inv-prov-101",
    producto_madre_id: "prod-m-001",
    proveedor_nombre: "Distribuidora LATAM S.A.",
    stock: 14,
    precio_costo: 720.00,
    precio_venta_sugerido: 899.99,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "inv-prov-102",
    producto_madre_id: "prod-m-001",
    proveedor_nombre: "Importaciones Oriente",
    stock: 5,
    precio_costo: 710.00,
    precio_venta_sugerido: 895.00,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "inv-prov-103",
    producto_madre_id: "prod-m-002",
    proveedor_nombre: "Distribuidora LATAM S.A.",
    stock: 8,
    precio_costo: 650.00,
    precio_venta_sugerido: 799.99,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "inv-prov-104",
    producto_madre_id: "prod-m-002",
    proveedor_nombre: "Tech Trade Global",
    stock: 12,
    precio_costo: 640.00,
    precio_venta_sugerido: 789.99,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "inv-prov-105",
    producto_madre_id: "prod-m-003",
    proveedor_nombre: "Audio Logistics",
    stock: 25,
    precio_costo: 45.00,
    precio_venta_sugerido: 89.99,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "inv-prov-106",
    producto_madre_id: "prod-m-003",
    proveedor_nombre: "Importaciones Oriente",
    stock: 15,
    precio_costo: 42.00,
    precio_venta_sugerido: 85.00,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const initialClientes = [
  {
    id: "cli-501",
    nombre: "Juan Pérez",
    identificacion: "109876543",
    telefono: "+57 300 123 4567",
    email: "juan.perez@mail.com",
    saldo_credito: 0.00,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "cli-502",
    nombre: "María Rodríguez",
    identificacion: "987654321",
    telefono: "+57 315 987 6543",
    email: "maria.rod@mail.com",
    saldo_credito: 150.00,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const initialTransaccionesFinanzas = [
  {
    id: "fin-901",
    tipo: "INGRESO",
    concepto: "Venta POS - Ticket #1004",
    monto: 899.99,
    fecha: "2026-07-06T15:30:22.000Z",
    metodo_pago: "EFECTIVO",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "fin-902",
    tipo: "INGRESO",
    concepto: "Venta POS - Ticket #1005",
    monto: 789.99,
    fecha: "2026-07-06T16:15:00.000Z",
    metodo_pago: "TARJETA",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "fin-903",
    tipo: "EGRESO",
    concepto: "Pago Proveedor - Audio Logistics",
    monto: 1125.00,
    fecha: "2026-07-06T10:00:00.000Z",
    metodo_pago: "TRANSFERENCIA",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

/**
 * Inicializa el localStorage con datos semilla si no existen las claves.
 */
export function initializeDatabase() {
  const checkAndSeed = (key, initialData) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialData));
      console.log(`Database seeded key: ${key}`);
    }
  };

  checkAndSeed('erp_productos_madre', initialProductosMadre);
  checkAndSeed('erp_inventario_proveedores', initialInventarioProveedores);
  checkAndSeed('erp_clientes', initialClientes);
  checkAndSeed('erp_transacciones_finanzas', initialTransaccionesFinanzas);
}
