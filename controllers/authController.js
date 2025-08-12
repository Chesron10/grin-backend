import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user or admin exists
    let user = await User.findOne({ email });
    let admin = await Admin.findOne({ email });

    if (!user && !admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const entity = user || admin;
    const entityType = user ? "user" : "admin";

    // Check password
    const isMatch = await bcrypt.compare(password, entity.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and return a token
    const payload = {
      user: {
        id: entity.id,
        role: entityType,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
