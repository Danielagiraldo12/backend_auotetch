// soporte.routes.js

import { Router } from "express";
import {
  getSoportes,
  createNewSoporte,
  getSoporteById,
  deleteSoporteById,
  updateSoporteById,
} from "../controllers/soporte.controllers.js";

const router = Router();

router.get("/soportes", getSoportes);
router.post("/soportes", createNewSoporte);
router.get("/soportes/:id", getSoporteById);
router.delete("/soportes/:id", deleteSoporteById);
router.put("/soportes/:id", updateSoporteById);

export default router;
