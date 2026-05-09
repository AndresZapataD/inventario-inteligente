import Producto from '../models/Producto.js';
import ProductoPerecedero from '../models/ProductoPerecedero.js';

const inventario = [
  new Producto(1, 'Laptop Dell', 'Laptop gaming de 15 pulgadas', 1200, 5, 'Electrónica'),
  new Producto(2, 'Mouse Logitech', 'Mouse inalámbrico USB', 25, 50, 'Accesorios'),
  new Producto(3, 'Teclado Mecánico', 'Teclado RGB Cherry MX', 120, 12, 'Accesorios'),

  new ProductoPerecedero(4, 'Leche Integral', 'Leche fresca de 1 litro', 3, 100, 'Alimentos', '2026-05-20'),
  new ProductoPerecedero(5, 'Yogur Griego', 'Yogur natural 500ml', 5, 45, 'Alimentos', '2026-05-25'),
  new Producto(6, 'Arroz Blanco', 'Arroz premium 5kg', 12, 30, 'Alimentos'),
];

function obtenerProductos() {
  return inventario.map(producto => producto.toJSON());
}

function obtenerProductoPorId(id) {
  const producto = inventario.find(p => p.getId() === parseInt(id));
  return producto ? producto.toJSON() : null;
}

function obtenerProductosPorCategoria(categoria) {
  return inventario
    .filter(p => p.getCategoria().toLowerCase() === categoria.toLowerCase())
    .map(p => p.toJSON());
}

function crearProducto(datosProducto) {
  const { nombre, descripcion, precio, stock, categoria, esPereceable, fechaVencimiento } = datosProducto;

  if (!nombre || !descripcion || precio < 0 || stock < 0) {
    throw new Error('Datos de producto inválidos');
  }

  const nuevoId = Math.max(...inventario.map(p => p.getId())) + 1;

  let nuevoProducto;

  if (esPereceable && fechaVencimiento) {
    nuevoProducto = new ProductoPerecedero(
      nuevoId,
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      fechaVencimiento
    );
  } else {
    nuevoProducto = new Producto(
      nuevoId,
      nombre,
      descripcion,
      precio,
      stock,
      categoria
    );
  }

  inventario.push(nuevoProducto);
  return nuevoProducto.toJSON();
}

function registrarVenta(productoId, cantidad) {
  const producto = inventario.find(p => p.getId() === parseInt(productoId));

  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  const ventaExitosa = producto.vender(cantidad);

  if (!ventaExitosa) {
    throw new Error('Stock insuficiente o producto vencido');
  }

  return {
    exito: true,
    mensaje: 'Venta registrada correctamente',
    producto: producto.toJSON()
  };
}

function reabastecer(productoId, cantidad) {
  const producto = inventario.find(p => p.getId() === parseInt(productoId));

  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  producto.reabastecer(cantidad);

  return {
    exito: true,
    mensaje: 'Stock actualizado correctamente',
    producto: producto.toJSON()
  };
}

export default {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  crearProducto,
  registrarVenta,
  reabastecer
};