import mongoose from "mongoose";

const admindSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
}, { timestamps: true });

const Admin = mongoose.model("Admin", admindSchema);

export default Admin;
