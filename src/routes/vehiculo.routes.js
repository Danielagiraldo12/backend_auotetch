// vehiculo.routes.js

import { Router } from "express";
import {
  getVehiculos,
  createNewVehiculo,
  getVehiculoById,
  deleteVehiculoById,
  updateVehiculoById,
} from "../controllers/vehiculo.controllers.js";

const router = Router();

router.get("/vehiculos", getVehiculos);
router.post("/vehiculos", createNewVehiculo);
router.get("/vehiculos/:id", getVehiculoById);
router.put("/vehiculos/:id", updateVehiculoById);
router.delete("/vehiculos/:id", deleteVehiculoById);

export default router;