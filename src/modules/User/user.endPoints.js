import { roles } from "../../middleware/auth.js";

const endPoint = {
  allUsers: [ roles.Admin, roles.User],
  blockUser: [ roles.Admin],
  users: [ roles.Admin],
};
export default endPoint;
