import { Schema, Types, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      unique: [true, "only one cart for each user"],
      required: [true, "userId is required"],
    },
    products: [{
      _id:{
      type: Types.ObjectId,
      ref: "productCart"
      },
      quantity: {
      type: Number
    }
}],
finalPrice: Number
  },
{
  timestamps: true,
  }
);
const cartModel = model("Cart", cartSchema);
export default cartModel;
