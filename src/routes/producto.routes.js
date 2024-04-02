import { Router } from "express";
import {
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} from "../controllers/producto.controllers.js";

const router = Router();

router.get("/productos", getProducts);
router.post("/productos", createNewProduct);
router.get("/productos/:id", getProductById);
router.delete("/productos/:id", deleteProductById);
router.put("/productos/:id", updateProductById);

export default router;
