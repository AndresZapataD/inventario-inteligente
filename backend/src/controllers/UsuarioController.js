import UsuarioService from "../services/UsuarioService.js";

class UsuarioController {
    async getAll(req, res) {
        try {
            const roles = await UsuarioService.getAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const role = await UsuarioService.getById(req.params.id);
            if (!role) {
                return res.status(404).json({ error: "usuario no encontrado" });
            }
            res.json(role);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const role = await UsuarioService.create(req.body);
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const role = await UsuarioService.update(req.params.id, req.body);
            res.json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await UsuarioService.delete(req.params.id);
            res.json({ message: "Usuario Eliminado" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new UsuarioController();