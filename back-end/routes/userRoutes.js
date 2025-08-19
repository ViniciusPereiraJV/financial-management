import express from "express"
import Users from "../schema/userSchema.js";
import mongoose from "mongoose";


const router = express.Router();

//register
router.post("/", async (req, res) => {
    try {
        const { name, cpf, phone, address } = req.body;

        // Verifica se o CPF já está cadastrado
        const existingUser = await Users.findOne({ cpf });
        if (existingUser) {
            return res.status(400).json({ error: "CPF já cadastrado!" });
        }
        const newUser = new Users({
            name,
            cpf,
            phone,
            address: address || {
                street: "",
                number: "",
                complement: "",
                district: "",
                city: "",
                state: "",
            },
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

//all of users
router.get("/", async (req, res)=> {
    try {
        const users = await Users.find();
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({error: "error ao pegar usuarios"})
    }
})
router.get("/:id", async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor" });
    }
  });

//refresh the user
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        //  Verifica se o ID é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        console.log("🔹 ID validado:", id);
        console.log("📌 Dados recebidos:", req.body);

        const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("❌ Erro ao atualizar usuário:", error);
        res.status(500).json({ error: "Erro ao atualizar usuário"});
    }
});



router.delete("/:id", async (req, res)=> {
    const {id} = req.params

    try {
        const userDelete = await Users.findById(id);
        if(!userDelete){
            return res.status(404).json({ error: "User not found" });
        }
        await Users.findByIdAndDelete(id);
        res.status(200).json({message:"User deleted!"})
    } catch (error) {
        res.status(400).json({error: "erro ao deleter usuario"})
    }
})

export default router