import { roles } from "../../middleware/auth.js";

const endPoint = {
  create: [roles.User,roles.Admin],
  cancel: [roles.User,roles.Admin],
  get: [roles.User,roles.Admin],
};
export default endPoint;
