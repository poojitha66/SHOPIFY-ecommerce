import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ product });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ product });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
