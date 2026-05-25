import { Venta } from "../models/Venta.js";
import { DetalleVenta } from "../models/DetalleVenta.js";
import { Producto } from "../models/Producto.js";
import { Cliente } from "../models/Cliente.js";
import { Usuario } from "../models/Usuario.js";
import { sequelize } from "../config/database.js";

class VentaController {

  // ==========================
  // OBTENER TODAS LAS VENTAS
  // ==========================

  async getAll(req, res) {

    try {

      const ventas = await Venta.findAll({
        include: [
          {
            model: Cliente
          },
          {
            model: Usuario
          },
          {
            model: DetalleVenta,
            include: [Producto]
          }
        ]
      });

      res.json(ventas);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

  // ==========================
  // OBTENER VENTA POR ID
  // ==========================

  async getById(req, res) {

    try {

      const venta = await Venta.findByPk(req.params.id, {
        include: [
          {
            model: Cliente
          },
          {
            model: Usuario
          },
          {
            model: DetalleVenta,
            include: [Producto]
          }
        ]
      });

      if (!venta) {

        return res.status(404).json({
          error: "Venta no encontrada"
        });

      }

      res.json(venta);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

  // ==========================
  // CREAR VENTA
  // ==========================

  async create(req, res) {

    const transaction = await sequelize.transaction();

    try {

      const {
        cliente_id,
        usuario_id,
        metodoPago,
        productos,
        observacion
      } = req.body;

      // ==========================
      // VALIDAR PRODUCTOS
      // ==========================

      if (!productos || productos.length === 0) {

        await transaction.rollback();

        return res.status(400).json({
          error: "La venta debe tener productos"
        });

      }

      let subtotalGeneral = 0;

      // ==========================
      // VALIDAR STOCK
      // ==========================

      for (const item of productos) {

        const producto = await Producto.findByPk(item.producto_id);

        if (!producto) {

          await transaction.rollback();

          return res.status(404).json({
            error: `Producto ${item.producto_id} no encontrado`
          });

        }

        if (producto.stock < item.cantidad) {

          await transaction.rollback();

          return res.status(400).json({
            error: `Stock insuficiente para ${producto.nombre}`
          });

        }

        subtotalGeneral += producto.precioVenta * item.cantidad;

      }

      // ==========================
      // CREAR VENTA
      // ==========================

      const venta = await Venta.create({
        cliente_id,
        usuario_id,
        metodoPago,
        subtotal: subtotalGeneral,
        impuesto: 0,
        descuento: 0,
        total: subtotalGeneral,
        estado: "PAGADA",
        observacion: observacion || ""
      }, { transaction });

      // ==========================
      // CREAR DETALLES
      // ==========================

      for (const item of productos) {

        const producto = await Producto.findByPk(item.producto_id);

        const subtotal = producto.precioVenta * item.cantidad;

        await DetalleVenta.create({
          venta_id: venta.id,
          producto_id: producto.id,
          nombreProducto: producto.nombre,
          cantidad: item.cantidad,
          precioUnitario: producto.precioVenta,
          subtotal
        }, { transaction });

        // ==========================
        // DESCONTAR STOCK
        // ==========================

        producto.stock -= item.cantidad;

        await producto.save({ transaction });

      }

      await transaction.commit();

      res.status(201).json({
        message: "Venta creada correctamente",
        venta
      });

    } catch (error) {

      await transaction.rollback();

      res.status(500).json({
        error: error.message
      });

    }

  }

  // ==========================
  // ELIMINAR VENTA
  // ==========================

  async delete(req, res) {

    try {

      const venta = await Venta.findByPk(req.params.id);

      if (!venta) {

        return res.status(404).json({
          error: "Venta no encontrada"
        });

      }

      await venta.destroy();

      res.json({
        message: "Venta eliminada correctamente"
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

}

export default new VentaController();