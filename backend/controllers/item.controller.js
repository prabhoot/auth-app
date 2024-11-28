const Order = require("../models/item.model.js");

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const { item, quantity, price } = req.body;

    if (!item || !quantity || !price) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newItem = await Order.create({ item, quantity, price });

    res.status(201).json({ success: true, data: newItem, message: "Item created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create item", error: error.message });
  }
};

// Retrieve all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Order.find();

    res.status(200).json({ success: true, data: items, message: "Items retrieved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to retrieve items", error: error.message });
  }
};

// Retrieve a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Order.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: item, message: "Item retrieved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to retrieve item", error: error.message });
  }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, quantity, price } = req.body;

    const updatedItem = await Order.findByIdAndUpdate(
      id,
      { item, quantity, price },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: updatedItem, message: "Item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update item", error: error.message });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Order.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: deletedItem, message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete item", error: error.message });
  }
};
