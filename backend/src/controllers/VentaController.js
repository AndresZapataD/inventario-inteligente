import { Venta } from "../models/Venta.js";

// Obtener todas las ventas
export const getAll = async (req, res) => {
    try {
        const ventas = await Venta.findAll();

        res.status(200).json(ventas);
    } catch(error){
        res.status(500).json(error);
    }
};

// Obtener por id
export const getById = async (req, res) => {
    try{
        const venta = await Venta.findByPk(req.params.id);

        if(!venta){
            return res.status(404).json({
                mensaje:"Venta no encontrada"
            });
        }

        res.status(200).json(venta);

    }catch(error){
        res.status(500).json(error);
    }
};

// Crear
export const create = async(req,res)=>{
    try{
        const venta = await Venta.create(req.body);

        res.status(201).json(venta);

    }catch(error){
        res.status(500).json(error);
    }
};

// Actualizar
export const update = async(req,res)=>{
    try{

        const venta = await Venta.findByPk(req.params.id);

        if(!venta){
            return res.status(404).json({
                mensaje:"Venta no encontrada"
            });
        }

        await venta.update(req.body);

        res.status(200).json(venta);

    }catch(error){
        res.status(500).json(error);
    }
};

// Eliminar
export const remove = async(req,res)=>{
    try{

        const venta = await Venta.findByPk(req.params.id);

        if(!venta){
            return res.status(404).json({
                mensaje:"Venta no encontrada"
            });
        }

        await venta.destroy();

        res.status(200).json({
            mensaje:"Venta eliminada"
        });

    }catch(error){
        res.status(500).json(error);
    }
};