import Product from "../models/productModel.js";
import { getFileUrl } from "../utils/upload.js";
import { getManyFileUrl, uploadMany } from "../utils/uploadController.js";

// Create a new product
export const createProduct = async (req, res) => {
  const { title, smeId, description, quantity, status } = req.body;
  const files = req.files;

  try {
    const uploadedImages = await uploadMany(files);
    // Create a new product
    const newProduct = new Product({
      title,
      smeId,
      description,
      quantity,
      status,
      images: uploadedImages,
    });

    // Save the new product
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    for (const product of products) {
      const urls = await getManyFileUrl(product.images);
      product.images = urls;
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const urls = await getManyFileUrl(product.images);
    product.images = urls;

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, quantity, status } = req.body;
  const files = req.files;

  try {
    if (files) {
      const uploadedImages = await uploadMany(files);
      // Find the product by id and update
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { title, description, quantity, status, images: uploadedImages },
        { new: true }
      );

      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, quantity, status },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by id and delete
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
