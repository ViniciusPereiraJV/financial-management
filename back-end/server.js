
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import router from "./routes/routes.js"
import Products from "./schema/productSchema.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router); 


mongoose
  .connect(process.env.MONGO_URL,)
  .then(() => console.log("✅ Banco de Dados Conectado com Sucesso"))
  .catch((err) => console.error("❌ Erro ao conectar ao banco:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
