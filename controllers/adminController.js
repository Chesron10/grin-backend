import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";

// Create a new admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, city } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      city,
    });

    // Save the new admin
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an admin
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, city } = req.body;

    // Find the admin by id and update
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { name, email, city },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the admin by id and delete
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
