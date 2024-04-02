// requerimiento.routes.js

import { Router } from "express";
import {
  getRequerimientos,
  createNewRequerimiento,
  getRequerimientoById,
  deleteRequerimientoById,
  updateRequerimientoById,
} from "../controllers/requerimiento.controllers.js";

const router = Router();

router.get("/requerimientos", getRequerimientos);
router.post("/requerimientos", createNewRequerimiento);
router.get("/requerimientos/:id", getRequerimientoById);
router.delete("/requerimientos/:id", deleteRequerimientoById);
router.put("/requerimientos/:id", updateRequerimientoById);

export default router;
