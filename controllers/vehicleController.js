import Vehicle from "../models/vehicleModel.js";
import { getFileUrl, uploadFile } from "../utils/upload.js";

// Create a new vehicle
export const createVehicle = async (req, res) => {
  const { name, type, driver, cityCouncilId, status } = req.body;
  const file = req.file;

  try {
    const uploadedImage = await uploadFile(file);
    // Create a new vehicle
    const newVehicle = new Vehicle({
      name,
      type,
      driver,
      cityCouncilId,
      status,
      image: uploadedImage,
    });

    // Save the new vehicle
    await newVehicle.save();

    res.status(201).json({ message: "Vehicle created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    for (const vehicle of vehicles) {
      const url = await getFileUrl(vehicle.image);
      vehicle.image = url;
    }
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const url = await getFileUrl(vehicle.image);
    vehicle.image = url;

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a vehicle
export const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { name, type, driver, cityCouncilId, status } = req.body;
  const file = req.file;
  try {
    if (file) {
      const uploadedImage = await uploadFile(file);
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        id,
        { name, type, driver, cityCouncilId, status, image: uploadedImage },
        { new: true }
      );

      return res.status(200).json({
        message: "Vehicle updated successfully",
        vehicle: updatedVehicle,
      });
    }
    // Find the vehicle by id and update
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { name, type, driver, cityCouncilId, status },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the vehicle by id and delete
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
