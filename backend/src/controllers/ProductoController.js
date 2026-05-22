import ProductoSercice from "../services/ProductoService.js";

class ProductoController {
    async getAll(req, res) {
        try {
            const productos = await ProductoSercice.getAll();
            res.json(productos);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const producto = await ProductoSercice.getById(id);
            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.json(producto);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const data = req.body;
            const nuevoProducto = await ProductoSercice.create(data);
            res.status(201).json(nuevoProducto);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const productoActualizado = await ProductoSercice.update(id, data);
            res.json(productoActualizado);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await ProductoSercice.delete(id);
            res.json({ message: "Producto eliminado correctamente" });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new ProductoController();