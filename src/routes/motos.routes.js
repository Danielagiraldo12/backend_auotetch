

import { Router } from "express"; //se importa rouyter de la libreria express
import { // y aca en este se importa todos los metodos del controlador del cliente.controllers.js
 
  getmotos,
  createNewmotos,
  getmotosById,
  deletemotosById,
  updatemotosById




} from "../controllers/motos.controllers.js";

const router = Router();

router.get("/motos", getmotos);
router.post("/motos", createNewmotos);
router.get("/motos/:id", getmotosById);
router.delete("/motos/:id", deletemotosById);
router.put("/motos/:id", updatemotosById);

export default router;
