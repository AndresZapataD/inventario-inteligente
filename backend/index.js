import express from 'express';
import productosRoutes from './src/routes/productos.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/productos', productosRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'Bienvenido a Inventario Inteligente IA',
    version: '1.0.0',
    documentacion: '/productos'
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl,
    metodo: req.method
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  res.status(500).json({
    error: 'Error interno del servidor',
    mensaje: err.message
  });
});

app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`✓ Endpoint disponible: GET http://localhost:${PORT}/productos`);
});