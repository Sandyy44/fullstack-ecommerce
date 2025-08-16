import * as productController from './controller/product.js';
import {  fileValidation, fileUpload } from '../../utils/multer.js';
import cartRouter from "../Cart/cart.router.js";
import { Router } from "express";

const router = Router({ mergeParams: true });
router.use("/:productId/cart", cartRouter);

// Create Product
router.post("/",fileUpload("product/", fileValidation.image).single("image"), productController.createProduct);

// Update Product
router.put("/:id", productController.updateProduct);

// Delete Product
router.delete("/:id", productController.deleteProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get all products for admin
router.get("/admin", productController.getAllProductsAdmin);

// Get product by id
router.get("/:id", productController.getProductById);

export default router;

// destruct the Router from express and make your own routers




// create Product

// update Product

// delete Product

// soft Delete Product

// return all products

// return Products for admin

// return Product By Id