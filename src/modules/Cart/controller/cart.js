import cartModel from '../../../../DB/models/Cart.js';
import productModel from '../../../../DB/models/Product.js';

// add and update the cart
export const createCart = async (req, res, next) => {
const {productId} = req.params
  const {  quantity } = req.body;
  const product = await productModel.findOne({_id:productId})
  if (!product) {
    return next(new Error("Invalid product id"), { cause: 400 })
  }
  if (product.stock < quantity) {


    return next(new Error(`Invalid product quantity. Max available is ${product.stock}`), { cause: 400 })
  }
  if (product.deleted) {

    return next(new Error(`Product not available`), { cause: 400 })
  }
  const cart = await cartModel.findOne({ userId: req.user._id })
  //user has no cart yet
  if (!cart) {
    let totPrice = product.price * quantity;
    const newCart = await cartModel.create({
      userId: req.user._id,
      products: [{ _id:productId, quantity }],
      finalPrice: totPrice
    })
    return res.status(201).json({ message: "Cart created successfully", cart: newCart })
  }

  let isProductInCart = false
  //user has cart but want to update
  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i]._id.toString() == productId) {
      let oldTotPrice = cart.products[i].quantity * product.price;
      let totPrice = product.price * quantity;
      cart.finalPrice -= oldTotPrice
      cart.finalPrice += totPrice
      //quantity change
      cart.products[i].quantity = quantity
      isProductInCart = true
    await cart.save()
    return res.status(201).json({ message: "Cart updated successfully", cart })
      
    }


  }

  //user adds to cart
  if (!isProductInCart) {
    let totPrice = product.price * quantity;
    cart.products.push({ _id:productId, quantity })
    cart.finalPrice += totPrice
    await cart.save()
    return res.status(201).json({ message: "Added to cart successfully", cart })
  }


}



// delete product from cart
export const deleteFromCartByProductId = async (req, res, next) => {
  const productId  = req.params.id;
  const cart = await cartModel.findOne({ userId: req.user._id })
  //user has no cart yet
  if (!cart) {
    return next(new Error(`User has no cart`), { cause: 404 })
  }
  let isProductInCart = false
  //check for product to delete
  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i]._id.toString() == productId) {
      const product = await productModel.findOne({_id:productId})
      let oldTotPrice = cart.products[i].quantity * product.price;

      cart.finalPrice -= oldTotPrice

      //delete product from cart
      cart.products.splice(i, 1);

      isProductInCart = true
      await cart.save()
      return res.status(204).json({ message: "Removed product from cart successfully", cart })
    }

  }
      //product not found to delete
    if (!isProductInCart) {
      return res.status(404).json({ message: "Product id not found" })
    }
}

// remove all products from cart
export const deleteAllFromCart = async (req, res, next) => {
  const cart = await cartModel.findOne({ userId: req.user._id })
  //user has no cart yet
  if (!cart) {
    return next(new Error(`User has no cart`), { cause: 404 })
  }

  cart.products = []
  cart.finalPrice=0
  await cart.save()
  return res.status(204).json({ message: "Removed all products from cart successfully", cart })
}

// get cart data
export const getCartData = async (req, res, next) => {
  const cart = await cartModel.findOne({ userId: req.user._id })
  //user has no cart yet
  if (!cart) {
    return next(new Error(`User has no cart`), { cause: 404 })
  }
  return res.status(200).json({ cart })
}