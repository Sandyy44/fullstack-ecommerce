import { roles } from "../../middleware/auth.js";

const endPoint = {
  create: [roles.Admin],
  delete: [roles.Admin],
  update: [roles.Admin],
  get: [roles.Admin, roles.User],
};
export { endPoint };