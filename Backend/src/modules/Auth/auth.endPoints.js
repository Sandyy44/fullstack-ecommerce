import { roles } from "../../middleware/auth.js";

const endPoint = {
  createAccount: [roles.SuperAdmin],
};
export default endPoint;
