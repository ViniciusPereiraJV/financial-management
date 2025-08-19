import express from "express";
import Products from "../schema/productSchema.js";


const router = express.Router();


// Criar produto (POST /products)
router.post("/", async (req, res) => {
  try {
    const {name, price, stock, category} = req.body

    const newProduct = new Products({
      name,
      price,
      stock,
      category
    });
    console.log("🟡 Salvando produto no banco...");
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

// Buscar todos os produtos (GET /products)
router.get("/", async (req, res) => {
  const products = await Products.find({ stock: { $gt: 0 } });;
  res.json(products);
});

// Buscar um produto por ID (GET /products/:id)
router.get("/:_id", async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// Atualizar produto (PUT /products/:id)
router.put("/:_id", async (req, res) => {
  try {
    const validatedData = productSchema.partial().parse(req.body);
    const updatedProduct = await Product.findByIdAndUpdate(req.params._id, validatedData, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

// Excluir produto (DELETE /products/:id)
router.delete("/:_id", async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params._id);
    res.json({ message: "Produto removido" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover produto" });
  }
});

export default router;
