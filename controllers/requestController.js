import Request from "../models/requestModel.js";
import { getManyFileUrl, uploadMany } from "../utils/uploadController.js";

// Create a new request
export const createRequest = async (req, res) => {
  const { title, image, userId, location, requestType } = req.body;
  const files = req.files;

  try {
    const uploadedImages = await uploadMany(files);
    // Create a new request
    const newRequest = new Request({
      title,
      image,
      userId,
      location,
      requestType,
      images: uploadedImages,
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
    for (const request of requests) {
      const urls = await getManyFileUrl(product.images);
      request.images = urls;
    }
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
    const urls = await getManyFileUrl(request.images);
    request.images = urls;

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a request
export const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { title, image, location, status, assignedDriver, requestType } =
    req.body;
  const files = req.files;

  try {
    if (files) {
      const uploadedImages = await uploadMany(files);
      // Find the product by id and update
      const updatedRequest = await Request.findByIdAndUpdate(
        id,
        { title, description, quantity, status, images: uploadedImages },
        { new: true }
      );

      return res.status(200).json({
        message: "Request updated successfully",
        request: updatedRequest,
      });
    }

    // Find the request by id and update
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { title, image, location, status, assignedDriver, requestType },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: "Request updated successfully",
      request: updatedRequest,
    });
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
