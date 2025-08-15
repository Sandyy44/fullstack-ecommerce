import * as cartController from './controller/cart.js'
import { Router } from "express";
import {endPoint} from './cart.endpoints.js';
import {auth} from '../../middleware/auth.js'
const router = Router({ mergeParams: true })
// add and update the cart
router.post('/',auth(endPoint.create), cartController.createCart)

// get cart data
router.get('/',auth(endPoint.get), cartController.getCartData)

// delete product from cart
router.delete('/:id',auth(endPoint.deleteProduct), cartController.deleteFromCartByProductId)

// remove all products from cart
router.delete('/',auth(endPoint.deleteProduct), cartController.deleteAllFromCart)

export default router;