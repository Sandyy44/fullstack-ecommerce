import * as categoryController from './controller/category.js'
import { Router } from "express";
import {endPoint} from './category.endpoints.js';
import {auth} from '../../middleware/auth.js'
const router = Router({ mergeParams: true })
// add category
router.post('/',auth(endPoint.create), categoryController.createCat)

// get all categories
router.get('/',auth(endPoint.get), categoryController.getAllCategories)

// get category by id
router.get('/:id',auth(endPoint.get), categoryController.getCategoryById)

// update category by id
router.patch('/:id',auth(endPoint.update), categoryController.updateCategory)

// delete category by id
router.delete('/:id',auth(endPoint.delete), categoryController.deleteCategory)

export default router;