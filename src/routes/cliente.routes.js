// cliente.routes.js

import { Router } from "express";
import {
  getClientes,
  createNewCliente,
  getClienteById,
  deleteClienteById,
  updateClienteById
} from "../controllers/cliente.controllers.js";

const router = Router();

router.get("/clientes", getClientes);
router.post("/clientes", createNewCliente);
router.get("/clientes/:id", getClienteById);
router.delete("/clientes/:id", deleteClienteById);
router.put("/clientes/:id", updateClienteById);

export default router;
