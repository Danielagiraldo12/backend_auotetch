// recordatorio.routes.js

import { Router } from "express";
import {
  getRecordatorios,
  createNewRecordatorio,
  getRecordatorioById,
  deleteRecordatorioById,
  updateRecordatorioById,
} from "../controllers/recordatorio.controllers.js";

const router = Router();

router.get("/recordatorios", getRecordatorios);
router.post("/recordatorios", createNewRecordatorio);
router.get("/recordatorios/:id", getRecordatorioById);
router.delete("/recordatorios/:id", deleteRecordatorioById);
router.put("/recordatorios/:id", updateRecordatorioById);

export default router;
