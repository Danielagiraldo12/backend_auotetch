// cliente.routes.js

import { Router } from "express"; //se importa rouyter de la libreria express
import { // y aca en este se importa todos los metodos del controlador del cliente.controllers.js
  getClientes,
  createNewCliente,
  getClienteById,
  deleteClienteById,
  updateClienteById
} from "../controllers/cliente.controllers.js";

const router = Router();
// se crean las rutas para cada metodo que existe en el controller y se exporta la constante 
//router para que sea consumida desde otros lados por eje el

router.get("/clientes", getClientes);
router.post("/clientes", createNewCliente);
router.get("/clientes/:id", getClienteById);
router.delete("/clientes/:id", deleteClienteById);
router.put("/clientes/:id", updateClienteById);

export default router;
