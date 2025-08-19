import mongoose from "mongoose"

const SaleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
},{ timestamps: true })

export default mongoose.model("Sales", SaleSchema)