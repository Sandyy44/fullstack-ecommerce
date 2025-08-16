import authRouter from "./Auth/auth.router.js";
import userRouter from "./User/user.router.js";
import productRouter from "./Product/product.router.js";
import cartRouter from "./Cart/cart.router.js";
import orderRouter from "./order/order.router.js";
import morgan from "morgan";
import { globalError } from "../utils/errorHandling.js";
import cors from "cors";


const bootstrap = (app, express) => {

  app.use((req, res, next) => {
    if (req.originalUrl == "/order/webhook") {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

  // // Setup cors

app.use(cors({
  origin: "*",
}));


  // // morgan check error

  if (process.env.MOOD == "DEV") {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }

  // // axios.post("baseUrl/subcategory/subCategoryByCategoryId/cvyuka",)

  // // Setup api routing
  app.use(`/auth`, authRouter);
  app.use(`/user`, userRouter);
  app.use(`/product`, productRouter);
  app.use(`/cart`, cartRouter);
  app.use(`/order`, orderRouter);

  app.use((req, res,next) => {
   return res.status(404).json({ message: "In-valid routing" });
  });


  // // Error handling
  app.use(globalError);
  // Connection DB
};
export default bootstrap;
