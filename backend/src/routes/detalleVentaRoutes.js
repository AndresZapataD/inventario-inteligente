import { Router } from "express";
import DetalleVentaController from "../controllers/DetalleVentaController.js";

const router = Router();


// ==========================
// OBTENER TODOS LOS DETALLES
// ==========================

router.get("/", (req, res) =>
  DetalleVentaController.getAll(req, res)
);


// ==========================
// OBTENER DETALLE POR ID
// ==========================

router.get("/:id", (req, res) =>
  DetalleVentaController.getById(req, res)
);


export default router;