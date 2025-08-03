import SME from "../models/smeModel.js";

// Create a new SME
export const createSME = async (req, res) => {
  try {
    const { name, owner } = req.body;

    // Create a new SME
    const newSME = new SME({
      name,
      owner,
    });

    // Save the new SME
    await newSME.save();

    res.status(201).json({ message: "SME created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all SMEs
export const getAllSMEs = async (req, res) => {
  try {
    const smes = await SME.find();
    res.status(200).json(smes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single SME by ID
export const getSMEById = async (req, res) => {
  try {
    const { id } = req.params;
    const sme = await SME.findById(id);

    if (!sme) {
      return res.status(404).json({ message: "SME not found" });
    }

    res.status(200).json(sme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a SME
export const updateSME = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, owner } = req.body;

    // Find the SME by id and update
    const updatedSME = await SME.findByIdAndUpdate(
      id,
      { name, owner },
      { new: true }
    );

    if (!updatedSME) {
      return res.status(404).json({ message: "SME not found" });
    }

    res.status(200).json({ message: "SME updated successfully", sme: updatedSME });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a SME
export const deleteSME = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the SME by id and delete
    const deletedSME = await SME.findByIdAndDelete(id);

    if (!deletedSME) {
      return res.status(404).json({ message: "SME not found" });
    }

    res.status(200).json({ message: "SME deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
