import { Producto } from "../models/Producto.js";

class ProductoService {
    async getAll() {
        return await Producto.findAll();
    }

    async getById(id) {
        return await Producto.findByPk(id);
    }

    async create(data) {
        return await Producto.create(data);
    }

    async update(id, data) {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return await producto.update(data);
    }

    async delete(id) {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return await producto.destroy();
    }
}

export default new ProductoService();