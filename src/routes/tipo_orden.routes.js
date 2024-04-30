// tipoOrden.routes.js

import { Router } from "express";
import {
  getTiposOrden,
  createNewTipoOrden,
  getTipoOrdenById,
  deleteTipoOrdenById,
  updateTipoOrdenById
} from "../controllers/tipo_orden.controllers.js";

const router = Router();

router.get("/tipos-orden", getTiposOrden);
router.post("/tipos-orden", createNewTipoOrden);
router.get("/tipos-orden/:id", getTipoOrdenById);
router.delete("/tipos-orden/:id", deleteTipoOrdenById);
router.put("/tipos-orden/:id", updateTipoOrdenById);

export default router;
