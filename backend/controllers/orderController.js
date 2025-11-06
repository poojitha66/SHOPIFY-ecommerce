import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = items.map((item) => {
      const product = products.find((p) => p._id.equals(item.product));
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      return {
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      total,
      shippingAddress,
    });

    return res.status(201).json({ order });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};
