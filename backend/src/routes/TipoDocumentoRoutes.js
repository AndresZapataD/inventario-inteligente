import express from "express";
const router = express.Router();

import TipoDocumentoController from "../controllers/TipoDocumentoController.js";

router.get("/", TipoDocumentoController.getAll);
router.get("/:id", TipoDocumentoController.getById);
router.post("/", TipoDocumentoController.create);
router.put("/:id", TipoDocumentoController.update);
router.delete("/:id", TipoDocumentoController.delete);

export default router;
