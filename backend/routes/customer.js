const express = require('express');
const router = express.Router();

const {
  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/Customer');
const { auth } = require('../middlewares/auth');

router.post('/customers-add',addCustomer);
router.get('/customers-get', auth, getCustomers);
router.get('/customers-get-all/:id', auth, getCustomerById);
router.delete('/customers-delete/:id', auth, deleteCustomer);
router.put('/customers-update/:id', auth, updateCustomer);

module.exports = router;
