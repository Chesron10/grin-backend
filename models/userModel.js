import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    location: {
      type: String,
    },
    productsCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    hearts: {
      type: Number,
      default: 0,
    },
    profileImg: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
