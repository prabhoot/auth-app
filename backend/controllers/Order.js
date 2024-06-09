const bcrypt = require("bcrypt");
const Order = require("../models/Order");
const Customer = require("../models/Customer");

exports.addOrder = async (req, res) => {
  try {
    const { customer_id, order_amount, order_date } = req.body;

    // Check if customer exists
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    const order = new Order({ customer_id, order_amount, order_date });
    await order.save();

    // Update customer's total_spends and number_of_visits
    customer.total_spends = (customer.total_spends || 0) + order_amount;
    await customer.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer_id');
    res.status(200).json({
      success: true,
      data: orders,
      message: "All orders fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id).populate('customer_id');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.status(200).json({
      success: true,
      data: order,
      message: `Successfully got order for ID ${id}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { customer_id, order_amount, order_date } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (customer_id) order.customer_id = customer_id;
    if (order_amount) order.order_amount = order_amount;
    if (order_date) order.order_date = order_date;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch the order details before deletion
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const { customer_id, order_amount } = order;

    // Delete the order
    await Order.findByIdAndDelete(id);

    // Update customer's total_spends and number_of_visits
    const customer = await Customer.findById(customer_id);
    if (customer) {
      customer.total_spends = (customer.total_spends || 0) - order_amount;
      customer.number_of_visits = (customer.number_of_visits || 0) - 1;

      await customer.save();
    }

    res.status(200).json({
      success: true,
      message: `Order with ID ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
    });
  }
};
