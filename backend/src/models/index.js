import { Rol } from "./Rol.js";
import { Usuario } from "./Usuario.js";
import { Categoria } from "./Categoria.js";
import { Producto } from "./Producto.js";
import { Venta } from "./Venta.js";
import { DetalleVenta } from "./DetalleVenta.js";
import { Factura } from "./Factura.js";
import { TipoDocumento } from "./TipoDocumento.js";
import { Cliente } from "./Cliente.js";


// ==========================================
// USUARIO - ROL
// ==========================================

Usuario.belongsTo(Rol, {
  foreignKey: "rol_id"
});

Rol.hasMany(Usuario, {
  foreignKey: "rol_id"
});


// ==========================================
// PRODUCTO - CATEGORIA
// ==========================================

Producto.belongsTo(Categoria, {
  foreignKey: "categoria_id"
});

Categoria.hasMany(Producto, {
  foreignKey: "categoria_id"
});


// ==========================================
// USUARIO - TIPO DOCUMENTO
// ==========================================

Usuario.belongsTo(TipoDocumento, {
  foreignKey: "TipoDocumentoId"
});

TipoDocumento.hasMany(Usuario, {
  foreignKey: "TipoDocumentoId"
});


// ==========================================
// CLIENTE - TIPO DOCUMENTO
// ==========================================

Cliente.belongsTo(TipoDocumento, {
  foreignKey: "TipoDocumentoId"
});

TipoDocumento.hasMany(Cliente, {
  foreignKey: "TipoDocumentoId"
});


// ==========================================
// VENTA - USUARIO
// ==========================================

Venta.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});

Usuario.hasMany(Venta, {
  foreignKey: "usuario_id"
});


// ==========================================
// VENTA - CLIENTE
// ==========================================

Venta.belongsTo(Cliente, {
  foreignKey: "cliente_id"
});

Cliente.hasMany(Venta, {
  foreignKey: "cliente_id"
});


// ==========================================
// DETALLE VENTA - VENTA
// ==========================================

DetalleVenta.belongsTo(Venta, {
  foreignKey: "venta_id"
});

Venta.hasMany(DetalleVenta, {
  foreignKey: "venta_id"
});


// ==========================================
// DETALLE VENTA - PRODUCTO
// ==========================================

DetalleVenta.belongsTo(Producto, {
  foreignKey: "producto_id"
});

Producto.hasMany(DetalleVenta, {
  foreignKey: "producto_id"
});


// ==========================================
// FACTURA - VENTA
// ==========================================

Factura.belongsTo(Venta, {
  foreignKey: "venta_id"
});

Venta.hasOne(Factura, {
  foreignKey: "venta_id"
});


// ==========================================
// EXPORTAR
// ==========================================

export {
  Rol,
  Usuario,
  Categoria,
  Producto,
  Venta,
  DetalleVenta,
  Factura,
  TipoDocumento,
  Cliente
};