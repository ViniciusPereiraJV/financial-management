import express from "express"
import userRoutes from "./userRoutes.js"
import Products from "./productRoutes.js";
import Sales from "./saleRoutes.js"

const router = express.Router();

router.use("/users", userRoutes);
router.use("/products", Products);
router.use("/sales", Sales);

export default router
