import { Usuario } from '../models/Usuario.js';

class UsuarioService {
    async getAll() {
        return await Usuario.findAll();
    }

    async getById(id) {
        return await Usuario.findByPk(id);
    }

    async create(data) {
        return await Usuario.create(data);
    }

    async update(id, data) {
        const usuario = await Usuario.findByPk(id); 
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        return await Usuario.update(data, { where: { id } });
    }

    async delete(id) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        return await Usuario.destroy({ where: { id } });
    }
}

export default new UsuarioService();