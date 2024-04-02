import { Router } from "express";
import {
  getUsuarios,
  createNewUsuario,
  updateUsuarioById,
  authenticateUsuario,
  getUsuarioById,
  deleteUsuarioById,
  
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/usuarios", getUsuarios);

router.post("/usuarios", createNewUsuario);

router.put("/usuarios/:id", updateUsuarioById);

router.post('/authenticate', authenticateUsuario);

router.get("/usuarios/:id", getUsuarioById);

router.delete("/usuarios/:id", deleteUsuarioById);



export default router;