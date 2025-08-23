import * as categoryController from './controller/category.js'
import { Router } from "express";
import {endPoint} from './category.endpoints.js';
import {auth} from '../../middleware/auth.js'
import { fileValidation, fileUpload } from '../../utils/multer.js';

const router = Router({ mergeParams: true })
// add category
router.post('/',auth(endPoint.create),fileUpload("categories/", fileValidation.image).single("image") ,categoryController.createCat)

// get all categories
router.get('/', categoryController.getAllCategories)

// get category by id
router.get('/:id', categoryController.getCategoryById)

// update category by id
router.patch('/:id',auth(endPoint.update),fileUpload("categories/", fileValidation.image).single("image"), categoryController.updateCategory)

// delete category by id
router.delete('/:id',auth(endPoint.delete), categoryController.deleteCategory)

export default router;