import { Router } from "express";
import {
  getEstados,
  createNewEstado,
  getEstadoById,
  deleteEstadoById,
  updateEstadoById
} from "../controllers/estado.controllers.js";

const router = Router();

router.get("/estados", getEstados);
router.post("/estados", createNewEstado);
router.get("/estados/:id", getEstadoById);
router.delete("/estados/:id", deleteEstadoById);
router.put("/estados/:id", updateEstadoById);

export default router;
