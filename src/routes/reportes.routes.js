// reportes.routes.js

import { Router } from "express"; //se importa rouyter de la libreria express
import { // y aca en este se importa todos los metodos del controlador del cliente.controllers.js
    getProductosSinStock,
    getHistorialVehiculoxPlacaxFechas,
 
} from "../controllers/reportes.controller.js";

const router = Router();
// se crean las rutas para cada metodo que existe en el controller y se exporta la constante 
//router para que sea consumida desde otros lados por eje el

router.get("/reportes/getProductosSinStock", getProductosSinStock);
router.get("/reportes/getHistorialVehiculoxPlacaxFechas", getHistorialVehiculoxPlacaxFechas);

export default router;
