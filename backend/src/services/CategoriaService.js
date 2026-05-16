import { Categoria } from "../models/categoria.js";

class CategoriaService {
    async getAll() {
        return await Categoria.findAll();
    }

    async getById() {
        return await Categoria.findByPk(id);
    }

    async create (data) {
        return await Categoria.create(data);
    }

    async update(id, data) {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            throw new Error("Categoria no encontrada");
        }
        return await categoria.update(data);
    }

    async delete(id) {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            throw new Error("Categoria no encontrada");
        }
        return await categoria.destroy();
    }
}

export default new CategoriaService();