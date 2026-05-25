import { DetalleVenta } from "../models/DetalleVenta.js";
import { Producto } from "../models/Producto.js";

class DetalleVentaController {

  async getAll(req, res) {

    try {

      const detalles = await DetalleVenta.findAll({
        include: [Producto]
      });

      res.json(detalles);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

  async getById(req, res) {

    try {

      const detalle = await DetalleVenta.findByPk(req.params.id, {
        include: [Producto]
      });

      if (!detalle) {

        return res.status(404).json({
          error: "Detalle no encontrado"
        });

      }

      res.json(detalle);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

}

export default new DetalleVentaController();