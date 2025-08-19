import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import Users from "../schema/userSchema.js";
import Products from "../schema/productSchema.js";
import Sales from "../schema/saleSchema.js";

const router = express.Router();

// Validação com Zod
const saleSchema = z.object({
  userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid user ID",
  }),
  productId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid product ID",
  }),
  quantity: z.number().int().positive(),
});

router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = saleSchema.parse(req.body);

    //checking if the client exist
    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ error: "user not found" });

    //checking if the product exist
    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    //checking if there are quantity enough for the sale
    if (product.stock < quantity) {
        return res.status(400).json({ error: "Insufficient stock" }); 
    }
//total price
    const totalPrice = product.price * quantity;

    //create the sale
    const sale = new Sales({userId, productId, quantity, totalPrice})
    await sale.save()

    //refresh the stock
    product.stock -= quantity;
    await product.save()

    res.status(201).json(sale);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res)=> {
    try {
        const sales = await Sales.find().populate("userId", "name").populate("productId", "name price")

        res.status(200).json(sales)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
      const sale = await Sales.findById(req.params.id)
        .populate("userId", "name email")
        .populate("productId", "name price");
  
      if (!sale) return res.status(404).json({ error: "Sale not found" });
  
      res.status(200).json(sale);
    } catch (error) {
      res.status(400).json({ error: "Invalid sale ID" });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const sale = await Sales.findById(req.params.id);
      if (!sale) return res.status(404).json({ error: "Sale not found" });
  
      // Restaurar o estoque do produto
      const product = await Product.findById(sale.productId);
      if (product) {
        product.stock += sale.quantity;
        await product.save();
      }
  
      // Deletar a venda
      await Sales.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: "Sale canceled and stock restored" });
    } catch (error) {
      res.status(400).json({ error: "Failed to cancel sale" });
    }
  });
  
export default router;