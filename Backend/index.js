import express from "express";
import "./src/utils/passportSetup.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bootstrap from "./src/modules/index.router.js";
import connectDB from "./DB/Conniction.js";
import productRouter from "./src/modules/Product/product.router.js";
import cors from "cors";

const app = express();
// Set directory direname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });

const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
const port = process.env.PORT || 5000;
// Middlewares for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/uploads", express.static("./src/uploads"))

// Routes
app.use("/product", productRouter);
bootstrap(app, express);

// DB connection
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});