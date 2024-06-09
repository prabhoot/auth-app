const express = require('express');
const router = express.Router();
const {
  addOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/Order');
const { auth } = require('../middlewares/auth');

// Define routes for orders
router.post('/orders', auth, addOrder);
router.get('/orders', auth, getOrders);
router.get('/orders/:id', auth, getOrderById);
router.put('/orders/:id', auth, updateOrder);
router.delete('/orders/:id', auth, deleteOrder);

module.exports = router;
