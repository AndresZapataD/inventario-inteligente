import { DetalleVenta } from "../models/DetalleVenta.js";
import { Producto } from "../models/Producto.js";
import { Venta } from "../models/Venta.js";

// GET ALL
export const getAll = async (req, res) => {
    try {
        const detalles = await DetalleVenta.findAll();
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET BY ID
export const getById = async (req, res) => {
    try {
        const detalle = await DetalleVenta.findByPk(req.params.id);

        if (!detalle) {
            return res.status(404).json({ mensaje: "No encontrado" });
        }

        res.status(200).json(detalle);
    } catch (error) {
        res.status(500).json(error);
    }
};

// CREATE (tu lógica mejorada)
export const create = async(req,res)=>{
    try{

        const { venta_id, producto_id, cantidad } = req.body;

        const producto = await Producto.findByPk(producto_id);

        if(!producto){
            return res.status(404).json({
                mensaje:"Producto no encontrado"
            });
        }

        if(producto.stock < cantidad){
            return res.status(400).json({
                mensaje:"Stock insuficiente"
            });
        }

        const subtotal = cantidad * producto.precioVenta;

        const detalle = await DetalleVenta.create({
            venta_id,
            producto_id,
            cantidad,
            precioUnitario: producto.precioVenta,
            subtotal
        });

        await producto.update({
            stock: producto.stock - cantidad
        });

        const venta = await Venta.findByPk(venta_id);

        await venta.update({
            total: Number(venta.total || 0) + Number(subtotal)
        });

        res.status(201).json(detalle);

    } catch(error){
        res.status(500).json(error);
    }
};

// UPDATE
export const update = async (req, res) => {
    try {
        const detalle = await DetalleVenta.findByPk(req.params.id);

        if (!detalle) {
            return res.status(404).json({ mensaje: "No encontrado" });
        }

        await detalle.update(req.body);

        res.status(200).json(detalle);
    } catch (error) {
        res.status(500).json(error);
    }
};

// DELETE
export const remove = async (req, res) => {
    try {
        const detalle = await DetalleVenta.findByPk(req.params.id);

        if (!detalle) {
            return res.status(404).json({ mensaje: "No encontrado" });
        }

        await detalle.destroy();

        res.status(200).json({ mensaje: "Eliminado" });
    } catch (error) {
        res.status(500).json(error);
    }
};