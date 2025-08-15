import { roles } from "../../middleware/auth.js";

export const endPoint = {
  create: [roles.User,roles.Admin],
  deleteProduct: [roles.User,roles.Admin],
  deleteAll:[roles.Admin,roles.Admin],
  get: [roles.User,roles.Admin],
};
