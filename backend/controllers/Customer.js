const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");

exports.addCustomer = async (req, res) => {
  try {
    const {  name, email, date, role, password, description } = req.body;
    console.log(name)
    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Customer already exists',
      });
    }

    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to encode passcode",
      });
    }

    // Create new customer
    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      role,
      description,
      createdAt:date,
    });

    return res.status(200).json({
      success: true,
      message: 'Customer created successfully',
    });
  } catch (error) {
    console.log("Error occurred");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Customer cannot be registered, try again later',
    });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const response = await Customer.find({});
    res.status(200).json({
      success: true,
      data: response,
      message: "All customers fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "Error from server",
      message: error.message,
    });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Customer.findById(id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "No such data found"
      });
    } else {
      res.status(200).json({
        success: true,
        data: response,
        message: `Successfully got customer for ID ${id}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "Server error",
      message: error.message,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Customer.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Customer with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting customer',
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, oldPassword, newPassword, role, total_spends, number_of_visits, last_visit_date } = req.body;

    // Find customer by ID
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Verify old password
    const isPasswordMatch = await bcrypt.compare(oldPassword, customer.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Update fields if provided
    if (name) customer.name = name;
    if (email) customer.email = email;
    if (role) customer.role = role;
    if (total_spends) customer.total_spends = total_spends;
    if (number_of_visits) customer.number_of_visits = number_of_visits;
    if (last_visit_date) customer.last_visit_date = last_visit_date;

    // If new password is provided, hash it before saving
    if (newPassword) {
      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        customer.password = hashedPassword;
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Unable to encode new password",
        });
      }
    }

    // Save updated customer
    await customer.save();

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating customer',
    });
  }
};
