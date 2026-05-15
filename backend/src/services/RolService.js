import Rol from "../models/Rol.js";

class RolService {
    async getAll() {
        return await Rol.findAll();
    }

    async getById(id) {
        return await Rol.findByPk(id);
    }

    async create(data) {
        return await Rol.create(data);
    }

    async update(id, data) {
        const rol = await Rol.findByPk(id); 
        if (!rol) {
            throw new Error("Rol no encontrado");
        }
        return await rol.update(data);
    }

    async delete(id) {
        const rol = await Rol.findByPk(id);
        if (!rol) {
            throw new Error("Rol no encontrado");
        }
        return await rol.destroy();
    }
}

export default new RolService();