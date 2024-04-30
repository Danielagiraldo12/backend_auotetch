// reparacion.routes.js

import { Router } from "express";
import {
  getReparaciones,
  createNewReparacion,
  getReparacionById,
  deleteReparacionById,
  updateReparacionById,
} from "../controllers/reparacion.controllers.js";

const router = Router();

router.get("/reparaciones", getReparaciones);
router.post("/reparaciones", createNewReparacion);
router.get("/reparaciones/:id", getReparacionById);
router.delete("/reparaciones/:id", deleteReparacionById);
router.put("/reparaciones/:id", updateReparacionById);

export default router;
