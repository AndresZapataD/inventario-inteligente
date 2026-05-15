import express from "express";
import RolController from "../controllers/RolController.js";
const router = express.Router();

router.get("/", RolController.getAll);
router.get("/:id", RolController.getById);
router.post("/", RolController.create);
router.put("/:id", RolController.update);
router.delete("/:id", RolController.delete);

export default router;