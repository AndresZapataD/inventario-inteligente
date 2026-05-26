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
        estado,
        impuesto,
        descuento,
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

      // Calcular montos
      const impuestoMonto = (subtotalGeneral * (impuesto || 0)) / 100;
      const descuentoMonto = (subtotalGeneral * (descuento || 0)) / 100;
      const totalVenta = subtotalGeneral + impuestoMonto - descuentoMonto;

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

  // ==========================
  // ACTUALIZAR VENTA
  // ==========================

  async update(req, res) {

    const transaction = await sequelize.transaction();

    try {

      const { id } = req.params;

      const {
        cliente_id,
        metodoPago,
        estado,
        observacion,
        productos
      } = req.body;

      // Validar que la venta exista
      const venta = await Venta.findByPk(id);

      if (!venta) {
        await transaction.rollback();
        return res.status(404).json({
          error: "Venta no encontrada"
        });
      }

      // Validar productos
      if (!productos || productos.length === 0) {
        await transaction.rollback();
        return res.status(400).json({
          error: "La venta debe tener productos"
        });
      }

      // Obtener detalles actuales
      const detallesActuales = await DetalleVenta.findAll({
        where: { venta_id: id },
        transaction
      });

      // Restaurar stock de productos anteriores
      for (const detalle of detallesActuales) {
        const producto = await Producto.findByPk(detalle.producto_id);
        if (producto) {
          producto.stock += detalle.cantidad;
          await producto.save({ transaction });
        }
      }

      // Eliminar detalles anteriores
      await DetalleVenta.destroy({
        where: { venta_id: id },
        transaction
      });

      // Validar nuevo stock
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

        subtotalGeneral += producto.precioVenta * item.cantidad;
      }

      // Actualizar venta
      await venta.update({
        cliente_id,
        metodoPago,
        estado: estado || venta.estado,
        subtotal: subtotalGeneral,
        total: subtotalGeneral,
        observacion: observacion || ""
      }, { transaction });

      // Crear nuevos detalles
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

        // Descontar stock
        producto.stock -= item.cantidad;
        await producto.save({ transaction });
      }

      await transaction.commit();

      // Obtener venta actualizada con relaciones
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

}

export default new VentaController();