import express from "express";
import ProductoController from "../controllers/ProductoController.js";
const router = express.Router();

router.get("/", ProductoController.getAll);
router.get("/:id", ProductoController.getById);
router.post("/", ProductoController.create);
router.put("/:id", ProductoController.update);
router.delete("/:id", ProductoController.delete);

export default router;