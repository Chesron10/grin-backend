import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Truck", "Tricycle"],
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    cityCouncilId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    status: {
      type: String,
      enum: ["In Service", "Out of Service"],
      default: "In Service",
    },
    image: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);
