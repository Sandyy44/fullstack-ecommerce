import { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "userName is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
      lowercase: true,
      trim: true,
    },
    slug: String,
    description: String,
    colors: [String],
    size:  [String],
    mainImage: {
      type: { secure_url: String, public_id: String },
      required: true,
    },
    subImages: { type: [{ secure_url: String, public_id: String }] },
    stock: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default:0
    },
    price: {
      type: Number,
      default: 1,
    },
    discound: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      default: 1,
    },
    soldItems: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Admin is required"],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    deletedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    cloudId: String,
  },
  {
    timestamps: true,
  }
);
const productModel = model("Product", productSchema);
export default productModel;
