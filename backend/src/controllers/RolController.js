import RolService from "../services/RolService.js";

class RolController {
    async getAll(req, res) {
        try {
            const roles = await RolService.getAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const role = await RolService.getById(req.params.id);
            if (!role) {
                return res.status(404).json({ error: "Rol no encontrado" });
            }
            res.json(role);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const role = await RolService.create(req.body);
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const role = await RolService.update(req.params.id, req.body);
            res.json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await RolService.delete(req.params.id);
            res.json({ message: "Rol eliminado" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new RolController();