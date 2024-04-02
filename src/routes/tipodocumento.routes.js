// tipodocumento.routes.js

import { Router } from "express";
import {
  getTiposDocumento,
  createNewTipoDocumento,
  getTipoDocumentoById,
  deleteTipoDocumentoById,
  updateTipoDocumentoById
} from "../controllers/tipodocumento.controllers.js";

const router = Router();

router.get("/tipos-documento", getTiposDocumento);
router.post("/tipos-documento", createNewTipoDocumento);
router.get("/tipos-documento/:id", getTipoDocumentoById);
router.delete("/tipos-documento/:id", deleteTipoDocumentoById);
router.put("/tipos-documento/:id", updateTipoDocumentoById);
// Agrega otras rutas según sea necesario

export default router;
