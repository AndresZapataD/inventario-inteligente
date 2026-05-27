import { Venta } from "../models/Venta.js";
import { DetalleVenta } from "../models/DetalleVenta.js";
import { Producto } from "../models/Producto.js";
import { Cliente } from "../models/Cliente.js";
import { Usuario } from "../models/Usuario.js";

import { sequelize } from "../config/database.js";

class VentaController {

  // ==========================================
  // OBTENER TODAS LAS VENTAS
  // ==========================================

  async getAll(req, res) {

    try {

      const ventas = await Venta.findAll({

        include: [
          { model: Cliente },
          { model: Usuario },
          {
            model: DetalleVenta,
            include: [Producto]
          }
        ],

        order: [["createdAt", "DESC"]]

      });

      res.json(ventas);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

  // ==========================================
  // OBTENER VENTA POR ID
  // ==========================================

  async getById(req, res) {

    try {

      const { id } = req.params;

      const venta = await Venta.findByPk(id, {

        include: [
          { model: Cliente },
          { model: Usuario },
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

  // ==========================================
  // CREAR VENTA
  // ==========================================

  async create(req, res) {

    const transaction = await sequelize.transaction();

    try {

      const {
        cliente_id,
        usuario_id,
        metodoPago,
        estado = "PAGADA",
        observacion,
        impuesto = 0,
        descuento = 0,
        productos
      } = req.body;

      // ==========================
      // VALIDACIONES
      // ==========================

      if (!cliente_id) {

        await transaction.rollback();

        return res.status(400).json({
          error: "El cliente es obligatorio"
        });

      }

      if (!usuario_id) {

        await transaction.rollback();

        return res.status(400).json({
          error: "El usuario es obligatorio"
        });

      }

      if (!productos || productos.length === 0) {

        await transaction.rollback();

        return res.status(400).json({
          error: "La venta debe tener productos"
        });

      }

      // ==========================
      // VALIDAR STOCK
      // ==========================

      let subtotalGeneral = 0;

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

        const subtotal =
          Number(item.precioUnitario) *
          Number(item.cantidad);

        subtotalGeneral += subtotal;

      }

      // ==========================
      // CALCULAR TOTALES
      // ==========================

      const impuestoMonto =
        subtotalGeneral * (Number(impuesto) / 100);

      const descuentoMonto =
        subtotalGeneral * (Number(descuento) / 100);

      const totalFinal =
        subtotalGeneral +
        impuestoMonto -
        descuentoMonto;

      // ==========================
      // CREAR VENTA
      // ==========================

      const venta = await Venta.create({

        cliente_id,
        usuario_id,
        metodoPago,

        subtotal: subtotalGeneral,
        impuesto,
        descuento,
        total: totalFinal,

        estado,
        observacion: observacion || ""

      }, { transaction });

      // ==========================
      // CREAR DETALLES
      // ==========================

      for (const item of productos) {

        const producto = await Producto.findByPk(item.producto_id);

        const subtotal =
          Number(item.precioUnitario) *
          Number(item.cantidad);

        await DetalleVenta.create({

          venta_id: venta.id,

          producto_id: producto.id,

          nombreProducto: producto.nombre,

          cantidad: item.cantidad,

          precioUnitario: item.precioUnitario,

          subtotal

        }, { transaction });

        // ==========================
        // DESCONTAR STOCK
        // ==========================

        producto.stock -= item.cantidad;

        await producto.save({ transaction });

      }

      await transaction.commit();

      const ventaCreada = await Venta.findByPk(venta.id, {

        include: [
          { model: Cliente },
          { model: Usuario },
          {
            model: DetalleVenta,
            include: [Producto]
          }
        ]

      });

      res.status(201).json({
        message: "Venta creada correctamente",
        venta: ventaCreada
      });

    } catch (error) {

      await transaction.rollback();

      res.status(500).json({
        error: error.message
      });

    }

  }

  // ==========================================
  // ACTUALIZAR VENTA
  // ==========================================

  async update(req, res) {

    const transaction = await sequelize.transaction();

    try {

      const { id } = req.params;

      const {
        cliente_id,
        metodoPago,
        estado,
        observacion,
        impuesto = 0,
        descuento = 0,
        productos
      } = req.body;

      const venta = await Venta.findByPk(id);

      if (!venta) {

        await transaction.rollback();

        return res.status(404).json({
          error: "Venta no encontrada"
        });

      }

      if (!productos || productos.length === 0) {

        await transaction.rollback();

        return res.status(400).json({
          error: "La venta debe tener productos"
        });

      }

      // =====================================
      // RESTAURAR STOCK ANTERIOR
      // =====================================

      const detallesActuales = await DetalleVenta.findAll({
        where: { venta_id: id },
        transaction
      });

      for (const detalle of detallesActuales) {

        const producto = await Producto.findByPk(detalle.producto_id);

        if (producto) {

          producto.stock += detalle.cantidad;

          await producto.save({ transaction });

        }

      }

      // =====================================
      // ELIMINAR DETALLES ANTERIORES
      // =====================================

      await DetalleVenta.destroy({
        where: { venta_id: id },
        transaction
      });

      // =====================================
      // VALIDAR NUEVO STOCK
      // =====================================

      let subtotalGeneral = 0;

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

        const subtotal =
          Number(item.precioUnitario) *
          Number(item.cantidad);

        subtotalGeneral += subtotal;

      }

      // =====================================
      // CALCULAR TOTALES
      // =====================================

      const impuestoMonto =
        subtotalGeneral * (Number(impuesto) / 100);

      const descuentoMonto =
        subtotalGeneral * (Number(descuento) / 100);

      const totalFinal =
        subtotalGeneral +
        impuestoMonto -
        descuentoMonto;

      // =====================================
      // ACTUALIZAR VENTA
      // =====================================

      await venta.update({

        cliente_id,
        metodoPago,
        estado,
        observacion: observacion || "",

        subtotal: subtotalGeneral,
        impuesto,
        descuento,
        total: totalFinal

      }, { transaction });

      // =====================================
      // CREAR NUEVOS DETALLES
      // =====================================

      for (const item of productos) {

        const producto = await Producto.findByPk(item.producto_id);

        const subtotal =
          Number(item.precioUnitario) *
          Number(item.cantidad);

        await DetalleVenta.create({

          venta_id: venta.id,

          producto_id: producto.id,

          nombreProducto: producto.nombre,

          cantidad: item.cantidad,

          precioUnitario: item.precioUnitario,

          subtotal

        }, { transaction });

        // =====================================
        // DESCONTAR STOCK
        // =====================================

        producto.stock -= item.cantidad;

        await producto.save({ transaction });

      }

      await transaction.commit();

      const ventaActualizada = await Venta.findByPk(id, {

        include: [
          { model: Cliente },
          { model: Usuario },
          {
            model: DetalleVenta,
            include: [Producto]
          }
        ]

      });

      res.json({
        message: "Venta actualizada correctamente",
        venta: ventaActualizada
      });

    } catch (error) {

      await transaction.rollback();

      res.status(500).json({
        error: error.message
      });

    }

  }

  // ==========================================
  // ELIMINAR VENTA
  // ==========================================

  async delete(req, res) {

    const transaction = await sequelize.transaction();

    try {

      const { id } = req.params;

      const venta = await Venta.findByPk(id);

      if (!venta) {

        await transaction.rollback();

        return res.status(404).json({
          error: "Venta no encontrada"
        });

      }

      // ==========================
      // RESTAURAR STOCK
      // ==========================

      const detalles = await DetalleVenta.findAll({
        where: { venta_id: id },
        transaction
      });

      for (const detalle of detalles) {

        const producto = await Producto.findByPk(detalle.producto_id);

        if (producto) {

          producto.stock += detalle.cantidad;

          await producto.save({ transaction });

        }

      }

      // ==========================
      // ELIMINAR DETALLES
      // ==========================

      await DetalleVenta.destroy({
        where: { venta_id: id },
        transaction
      });

      // ==========================
      // ELIMINAR VENTA
      // ==========================

      await venta.destroy({ transaction });

      await transaction.commit();

      res.json({
        message: "Venta eliminada correctamente"
      });

    } catch (error) {

      await transaction.rollback();

      res.status(500).json({
        error: error.message
      });

    }

  }

}

export default new VentaController();