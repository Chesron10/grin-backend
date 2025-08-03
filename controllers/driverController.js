import Driver from "../models/driverModel.js";
import bcrypt from "bcryptjs";

// Create a new driver
export const createDriver = async (req, res) => {
  try {
    const { fullName, email, password, cityCouncilId } = req.body;

    // Check if driver already exists
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new driver
    const newDriver = new Driver({
      fullName,
      email,
      password: hashedPassword,
      cityCouncilId,
    });

    // Save the new driver
    await newDriver.save();

    res.status(201).json({ message: "Driver created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all drivers
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single driver by ID
export const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findById(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a driver
export const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, cityCouncilId } = req.body;

    // Find the driver by id and update
    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { fullName, email, cityCouncilId },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver updated successfully", driver: updatedDriver });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a driver
export const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the driver by id and delete
    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
