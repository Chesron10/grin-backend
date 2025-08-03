import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  smeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sme",
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Available", "Not Available"],
    default: "Available",
  },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
