import { Router } from "express";
import * as orderController from './controller/order.js'
import {auth} from '../../middleware/auth.js'
import endPoint from './order.endpoints.js'
const router = Router();



// add order
router.post('/',auth(endPoint.create),orderController.createOrder)

// cencel order
router.patch('/:id',auth(endPoint.cancel),orderController.cancelOrder)

// get orders
router.get('/',auth(endPoint.get),orderController.getOrders)
export default router;







