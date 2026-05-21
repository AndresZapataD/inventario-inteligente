import { TipoDocumento } from "../models/TipoDocumento.js";

class TipoDocumentoService {
    async getAll() {
        return await TipoDocumento.findAll();
    }

    async getById(id) {
        return await TipoDocumento.findByPk(id);
    }

    async create(data) {
        return await TipoDocumento.create(data);
    }

    async update(id, data) {
        const tipoDocumento = await TipoDocumento.findByPk(id);
        if (!tipoDocumento) {
            throw new Error("TipoDocumento no encontrado");
        }
        return await TipoDocumento.update(data, { where: { id } });
    }

    async delete(id) {
        const tipoDocumento = await TipoDocumento.findByPk(id);
        if (!tipoDocumento) {
            throw new Error("TipoDocumento no encontrado");
        }
        return await TipoDocumento.destroy({ where: { id } });
    }
}

export default new TipoDocumentoService();