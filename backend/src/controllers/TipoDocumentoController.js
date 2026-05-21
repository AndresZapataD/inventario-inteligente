import TipoDocumentoService from "../services/TipoDocumentoService.js";

class TipoDocumentoController {
    async getAll(req, res) {
        try {
            const tiposDocumento = await TipoDocumentoService.getAll();
            res.json(tiposDocumento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const tipoDocumento = await TipoDocumentoService.getById(req.params.id);
            if (!tipoDocumento) {
                return res.status(404).json({ error: "TipoDocumento no encontrado" });
            }
            res.json(tipoDocumento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const tipoDocumento = await TipoDocumentoService.create(req.body);
            res.status(201).json(tipoDocumento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const tipoDocumento = await TipoDocumentoService.update(req.params.id, req.body);
            res.json(tipoDocumento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const tipoDocumento = await TipoDocumentoService.delete(req.params.id);
            res.json(tipoDocumento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new TipoDocumentoController();
