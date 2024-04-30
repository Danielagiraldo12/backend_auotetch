// perfil.routes.js

import { Router } from "express";
import {
  getPerfiles,
  createNewPerfil,
  getPerfilById,
  deletePerfilById,
  updatePerfilById
} from "../controllers/perfil.controllers.js";

const router = Router();

router.get("/perfiles", getPerfiles);
router.post("/perfiles", createNewPerfil);
router.get("/perfiles/:id", getPerfilById);
router.delete("/perfiles/:id", deletePerfilById);
router.put("/perfiles/:id", updatePerfilById);

export default router;
