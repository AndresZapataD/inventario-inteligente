
//GUÍA DE PRUEBAS RÁPIDAS
 
// ============================================
// 1. OBTENER TODOS LOS PRODUCTOS
// ============================================
// Respuesta: 200 OK con lista de 6 productos
// URL: http://localhost:3000/productos

curl http://localhost:3000/productos


// ============================================
// 2. OBTENER UN PRODUCTO ESPECÍFICO
// ============================================
// Respuesta: 200 OK con producto ID 1
// URL: http://localhost:3000/productos/1

curl http://localhost:3000/productos/1


// ============================================
// 3. OBTENER PRODUCTOS POR CATEGORÍA
// ============================================
// Respuesta: 200 OK con productos de Alimentos
// URL: http://localhost:3000/productos/categoria/Alimentos

curl http://localhost:3000/productos/categoria/Alimentos


// ============================================
// 4. REGISTRAR VENTA (disminuye stock)
// ============================================
// Antes: Laptop Dell tiene stock: 5
// Vender: 2 unidades
// Después: stock será 3

curl -X POST http://localhost:3000/productos/1/venta \
  -H "Content-Type: application/json" \
  -d '{"cantidad": 2}'


// ============================================
// 5. REABASTECER PRODUCTO (aumenta stock)
// ============================================
// Agregar 10 unidades a Laptop Dell

curl -X POST http://localhost:3000/productos/1/reabastecer \
  -H "Content-Type: application/json" \
  -d '{"cantidad": 10}'


// ============================================
// 6. CREAR NUEVO PRODUCTO
// ============================================
// POST /productos con datos JSON

curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Monitor LG 4K",
    "descripcion": "Monitor ultrawide 49 pulgadas",
    "precio": 899,
    "stock": 3,
    "categoria": "Electrónica"
  }'


// ============================================
// 7. CREAR PRODUCTO PERECEDERO
// ============================================
// Producto con fecha de vencimiento

curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Queso Fresco",
    "descripcion": "Queso de cabra 500g",
    "precio": 8,
    "stock": 25,
    "categoria": "Alimentos",
    "esPereceable": true,
    "fechaVencimiento": "2026-05-30"
  }'


// ============================================
// 8. INTENTAR VENDER MÁS DE LO DISPONIBLE
// ============================================
// Respuesta: 400 Bad Request
// Error: "Stock insuficiente o producto vencido"

curl -X POST http://localhost:3000/productos/1/venta \
  -H "Content-Type: application/json" \
  -d '{"cantidad": 1000}'


// ============================================
// 9. PRODUCTO NO ENCONTRADO
// ============================================
// Respuesta: 404 Not Found

curl http://localhost:3000/productos/999


// ============================================
// 10. RUTA NO EXISTE
// ============================================
// Respuesta: 404 Not Found

curl http://localhost:3000/ruta-inventada


// ============================================
// VERIFICACIÓN DE CLASES
// ============================================

// En src/models/Producto.js:
// ✓ Encapsulamiento: atributos privados (_id, _nombre, etc.)
// ✓ Getters: getId(), getNombre(), getPrecio(), etc.
// ✓ Setters: setPrecio(), setNombre(), setStock(), etc.
// ✓ Métodos: vender(), reabastecer(), toJSON()

// En src/models/ProductoPerecedero.js:
// ✓ Herencia: class ProductoPerecedero extends Producto
// ✓ Constructor con super()
// ✓ Sobrescritura: vender(), toJSON()
// ✓ Métodos propios: estaVencido(), diasHastaVencimiento()


// ============================================
// ESTRUCTURA PROFESIONAL
// ============================================

// backend/
// ├── index.js (punto de entrada)
// ├── package.json (dependencias)
// ├── README.md (documentación)
// ├── .gitignore
// └── src/
//     ├── models/
//     │   ├── Producto.js
//     │   └── ProductoPerecedero.js
//     ├── controllers/
//     │   └── productosController.js
//     └── routes/
//         └── productos.js
