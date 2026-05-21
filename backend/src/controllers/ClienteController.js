import ClienteService from "../services/ClienteService.js";

class ClienteController {
    async getAll(req, res) {
        try {
            const clientes = await ClienteService.getAll();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }   


    async getById(req, res) {
        try {
            const cliente = await ClienteService.getById(req.params.id);    
            if (!cliente) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }

            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }   

    }

    async create(req, res) {
        try {
            const cliente = await ClienteService.create(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const cliente = await ClienteService.update(req.params.id, req.body);
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }   

    async delete(req, res) {
        try {
            await ClienteService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new ClienteController();