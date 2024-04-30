// repuesto.routes.js

import { Router } from "express";
import {
  getRepuestos,
  createNewRepuesto,
  getRepuestoById,
  deleteRepuestoById,
  updateRepuestoById,
} from "../controllers/repuesto.controllers.js";

const router = Router();

router.get("/repuestos", getRepuestos);
router.post("/repuestos", createNewRepuesto);
router.get("/repuestos/:id", getRepuestoById);
router.delete("/repuestos/:id", deleteRepuestoById);
router.put("/repuestos/:id", updateRepuestoById);

export default router;
