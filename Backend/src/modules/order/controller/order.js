import orderModel from "../../../../DB/models/Order.js"
import productModel from "../../../../DB/models/Product.js"
import cartModel from "../../../../DB/models/Cart.js"

// add order
export const createOrder = async (req, res, next) => {
  const { products, address, note, paymentMethod, phone } = req.body

  let finalProductList = []
  let subTotal = 0
  let productIds=[]
  for (let product of products) {
    const checkProduct = await productModel.findOne({
      _id: product._id,
      stock: { $gte: product.quantity },
      deleted: false
    })
    if (!checkProduct) return next(new Error(`Invalid product with ID ${product._id}`, { cause: 400 }))

    product.name = checkProduct.name
    product.unitePrice = checkProduct.price
    console.log(product)
    const lineTotal = Number((product.quantity * checkProduct.finalPrice).toFixed(2));
    product.finalPrice = lineTotal
    productIds.push(product._id)
    finalProductList.push({
      name: product.name,
      productId: product._id,
      quantity: product.quantity,
      unitePrice: product.unitePrice,
      finalPrice: Number.parseFloat(product.finalPrice)


    })
    subTotal += lineTotal

    //decrease product quantity
    await productModel.updateOne({ _id: product._id }, { $inc: { stock: -parseInt(product.quantity) } })

  }
//created order
  const createdOrder = await orderModel.create({
    userId: req.user._id,
    address,
    phone,
    note,
    products: finalProductList,
    finalPrice: Number.parseFloat(subTotal).toFixed(2),
    paymentMethod,
    status: paymentMethod == 'card' ? "waitPayment" : "placed"

  });
//clear cart
await cartModel.updateOne(
  { userId: req.user._id },
  {
    $pull: {
      products: { _id: { $in: productIds } }
    }
  }
);


  return res.status(201).json({ message: "Order Done", createdOrder })

}

// cencel order
export const cancelOrder = async (req, res, next) => {
  const  orderId  = req.params.id
  const { reason } = req.body
  console.log(orderId)
  const order = await orderModel.findOne({ _id: orderId, userId: req.user._id })
  console.log(order)
  if (!order){return next(new Error("Cannot cancel order", { cause: 400 }))}

  const cenceledOrder = await orderModel.updateOne({ _id: orderId }, { status: 'cenceled', reason, updatedBy: req.user._id })
  if (!cenceledOrder.matchedCount)
    return next(new Error("Cannot cancel order", { cause: 400 }))
  for (let product of order.products) {
    await productModel.updateOne({ _id: product.productId }, { $inc: { stock: parseInt(product.quantity) } })
  }
  return res.status(200).json({ message: "Canceled order successfully" })
}

// get orders
export const getOrders = async (req, res, next) => {
  const orders = await orderModel.find({ userId: req.user._id })
  //user has no orders yet
  if (!orders) {
    return next(new Error(`User has no orders`), { cause: 404 })
  }
  return res.status(200).json({ orders })
}
