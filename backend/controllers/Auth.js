const bcrypt = require('bcrypt');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // already exist
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Customer already exist',
      });
    }
    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to encode passcode',
      });
    }
    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: 'Customer created successfully',
    });
  } catch (error) {
    console.log('error occured');
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Customer can not be registered, try again later',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const customer = await Customer.findOne({ email });
    console.log(customer);

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Customer not found',
      });
    }
    if (await bcrypt.compare(password, customer.password)) {
      const payload = {
        email: customer.email,
        id: customer._id,
        role: customer.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      // Update number_of_visits and last visit
      customer.number_of_visits = (customer.number_of_visits || 0) + 1;
      customer.last_visit_date = Date.now() + 5.5 * 60 * 60 * 1000;
      customer.isOnline = true;
      customer.token = token;
      await customer.save();

      // Clear sensitive data before sending the response
      customer.password = undefined;
      res
        .cookie('token', token, {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          customer,
          message: 'Customer logged in successfully',
        });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(`id value in backend ${id}`);
    if (!id) {
      return res.status(401).json({
        success: false,
        message: `Invalid ID : ${id}`,
      });
    }
    // const id="666551f7761db1e0b7841688"
    // Check if the customer is already logged out (token is null or empty)
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: `no customer found by id: ${id}`,
      });
    }
    let token = customer.token;
    if (customer.isOnline || customer.isOnline === null) {
      customer.isOnline = false;
    }
    // console.log(customer.token);
    if (token === '') {
      return res
        .status(400)
        .json({ success: false, message: 'Customer is already logged out' });
    } else {
      token = '';
    }
    customer.save();
    console.log(customer);
    //  Invalidate the token by setting its expiration to a past date in database.
    // Clear the token by setting its expiration to a past date
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};
