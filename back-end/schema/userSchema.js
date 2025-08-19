import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String },
    district: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }
  }
}, { timestamps: true });

const Users = mongoose.model("Users", UserSchema);
export default Users;
