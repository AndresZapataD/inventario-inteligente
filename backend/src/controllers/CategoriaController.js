import CategoriaService from "../services/CategoriaService.js";

class CategoriaController {
    async getAll(req, res) {
        try {
            const categorias = await CategoriaService.getAll();
            res.json(categorias);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaService.getById(id);
            if (!categoria) {
                return res.status(404).json({ error: "Categoria no encontrada" });
            }
            res.json(categoria);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const data = req.body;
            const nuevaCategoria = await CategoriaService.create(data);
            res.status(201).json(nuevaCategoria);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const categoriaActualizada = await CategoriaService.update(id, data);
            res.json(categoriaActualizada);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await CategoriaService.delete(id);
            res.json({ message: "Categoria eliminada correctamente" });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CategoriaController();