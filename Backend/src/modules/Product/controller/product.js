
import slugify from "slugify";
import productModel from "../../../../DB/models/Product.js";

// Create Product
export const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, stock } = req.body;
        req.body.createdBy = req.user._id;
        console.log(req.user._id);

        if (!name) {
            return res.status(400).json({ message: "Product name is required" });
        }

        req.body.slug = slugify(name, { replacement: '-', trim: true, lower: true });

        if (req.file) {
            req.body.image = {
                secure_url: `/uploads/product/${req.file.filename}`,
                public_id: req.file.filename
            };
        }


        const product = await productModel.create(req.body);
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        next(error);
    }
};

// Update Product
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        if (req.body.name) {
            req.body.slug = slugify(req.body.name, { replacement: '-', trim: true, lower: true });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        next(error);
    }
};

// Delete Product
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all products
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({ isDeleted: { $ne: true } });
        res.json({ products });
    } catch (error) {
        next(error);
    }
};

// Get all products (admin)
export const getAllProductsAdmin = async (req, res, next) => {
    try {
        const products = await productModel.find();
        res.json({ products });
    } catch (error) {
        next(error);
    }
};

// Get product by id
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json({ product });
    } catch (error) {
        next(error);
    }
};



// create Product

// update Product

// delete Product

// soft Delete Product

// return all products

// return Products for admin

// return Product By Id