const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller.js");

// Routes
router.post("/items", itemController.createItem);           // Create a new item
router.get("/items", itemController.getAllItems);           // Get all items
router.get("/items/:id", itemController.getItemById);       // Get an item by ID
router.put("/items/:id", itemController.updateItem);        // Update an item by ID
router.delete("/items/:id", itemController.deleteItem);     // Delete an item by ID

module.exports = router;
