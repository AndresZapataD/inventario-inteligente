import { Cliente } from "../models/index.js";

class ClienteService {
    async getAll() {
        return await Cliente.findAll();
    }

    async getById(id) {
        return await Cliente.findByPk(id);
    }   

    async create(data) {
        return await Cliente.create(data);
    }

    async update(id, data) {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            throw new Error("Cliente no encontrado");
        }
        return await Cliente.update(data, { where: { id } });
    }

    async delete(id) {
        const cliente = await Cliente.findByPk(id); 
        if (!cliente) {
            throw new Error("Cliente no encontrado");
        }
        return await Cliente.destroy({ where: { id } });
    }   

}

export default new ClienteService();