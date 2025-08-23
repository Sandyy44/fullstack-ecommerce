import * as productController from './controller/product.js';
import { fileValidation, fileUpload } from '../../utils/multer.js';
import cartRouter from "../Cart/cart.router.js";
import { Router } from "express";
import { endPoint } from './product.endPoints.js';
import { auth } from '../../middleware/auth.js'
const router = Router({ mergeParams: true });
router.use("/:productId/cart", cartRouter);

// Create Product
router.post("/", auth(endPoint.create), fileUpload("product/", fileValidation.image).single("image"), productController.createProduct);

// Update Product
router.put("/:id", auth(endPoint.update),fileUpload("product/", fileValidation.image).single("image"), productController.updateProduct);

// Delete Product
router.delete("/:id", auth(endPoint.delete), productController.deleteProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get product by id
router.get("/:id", auth(endPoint.get), productController.getProductById);

export default router;

// destruct the Router from express and make your own routers




// create Product

// update Product

// delete Product

// soft Delete Product

// return all products

// return Products for admin

// return Product By Id