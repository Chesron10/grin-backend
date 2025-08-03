import Request from "../models/requestModel.js";

// Create a new request
export const createRequest = async (req, res) => {
  try {
    const { title, image, userId, location, requestType } = req.body;

    // Create a new request
    const newRequest = new Request({
      title,
      image,
      userId,
      location,
      requestType,
    });

    // Save the new request
    await newRequest.save();

    res.status(201).json({ message: "Request created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single request by ID
export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a request
export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, location, status, assignedDriver, requestType } = req.body;

    // Find the request by id and update
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { title, image, location, status, assignedDriver, requestType },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request updated successfully", request: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a request
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the request by id and delete
    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
