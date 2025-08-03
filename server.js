import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import smeRoutes from "./routes/smeRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/products", productRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/smes", smeRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
