// ordenTrabajo.routes.js

import { Router } from "express";
import {
  getOrdenesTrabajo,
  createNewOrdenTrabajo,
  getOrdenTrabajoById,
  deleteOrdenTrabajoById,
  updateOrdenTrabajoById,
} from "../controllers/ordenTrabajo.controllers.js";

const router = Router();

router.get("/ordenes-trabajo", getOrdenesTrabajo);
router.post("/ordenes-trabajo", createNewOrdenTrabajo);
router.get("/ordenes-trabajo/:id", getOrdenTrabajoById);
router.delete("/ordenes-trabajo/:id", deleteOrdenTrabajoById);
router.put("/ordenes-trabajo/:id", updateOrdenTrabajoById);

export default router;
