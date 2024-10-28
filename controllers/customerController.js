const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let customer = await Customer.findOne({ email });
    if (customer) return res.status(400).json({ msg: 'Customer already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    customer = new Customer({ name, email, password: hashedPassword });
    await customer.save();

    const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('-password');
    res.json(customer);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};