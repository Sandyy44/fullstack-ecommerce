import { Schema, Types, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "category name must be unique"],
    }
  }
);
const categoryModel = model("Category", categorySchema);
export default categoryModel;
