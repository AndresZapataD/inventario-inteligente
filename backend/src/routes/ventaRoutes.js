import { Router } from "express";
import VentaController from "../controllers/VentaController.js";

const router = Router();


// ==========================
// OBTENER TODAS LAS VENTAS
// ==========================

router.get("/", (req, res) =>
  VentaController.getAll(req, res)
);


// ==========================
// OBTENER VENTA POR ID
// ==========================

router.get("/:id", (req, res) =>
  VentaController.getById(req, res)
);


// ==========================
// CREAR VENTA
// ==========================

router.post("/", (req, res) =>
  VentaController.create(req, res)
);


// ==========================
// ELIMINAR VENTA
// ==========================

router.delete("/:id", (req, res) =>
  VentaController.delete(req, res)
);


export default router;