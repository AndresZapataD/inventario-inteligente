import express from 'express';
import productosController from '../controllers/productosController.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const productos = productosController.obtenerProductos();
    
    res.status(200).json({
      exito: true,
      total: productos.length,
      datos: productos
    });

  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
});

router.get('/:id', (req, res) => {
  try {
    const producto = productosController.obtenerProductoPorId(req.params.id);

    if (!producto) {
      return res.status(404).json({
        exito: false,
        error: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      exito: true,
      datos: producto
    });

  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
});

router.get('/categoria/:categoria', (req, res) => {
  try {
    const productos = productosController.obtenerProductosPorCategoria(req.params.categoria);

    if (productos.length === 0) {
      return res.status(404).json({
        exito: false,
        error: 'No hay productos en esa categoría'
      });
    }

    res.status(200).json({
      exito: true,
      total: productos.length,
      datos: productos
    });

  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
});

router.post('/', (req, res) => {
  try {
    const nuevoProducto = productosController.crearProducto(req.body);

    res.status(201).json({
      exito: true,
      mensaje: 'Producto creado correctamente',
      datos: nuevoProducto
    });

  } catch (error) {
    res.status(400).json({
      exito: false,
      error: error.message
    });
  }
});

router.post('/:id/venta', (req, res) => {
  try {
    const { cantidad } = req.body;

    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({
        exito: false,
        error: 'La cantidad debe ser un número positivo'
      });
    }

    const resultado = productosController.registrarVenta(req.params.id, cantidad);

    res.status(200).json(resultado);

  } catch (error) {
    res.status(400).json({
      exito: false,
      error: error.message
    });
  }
});

router.post('/:id/reabastecer', (req, res) => {
  try {
    const { cantidad } = req.body;

    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({
        exito: false,
        error: 'La cantidad debe ser un número positivo'
      });
    }

    const resultado = productosController.reabastecer(req.params.id, cantidad);

    res.status(200).json(resultado);

  } catch (error) {
    res.status(400).json({
      exito: false,
      error: error.message
    });
  }
});

export default router;