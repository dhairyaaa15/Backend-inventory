// controllers/itemController.js

const Item = require('../models/Item');

// Add a new item
exports.addItem = async (req, res) => {
  const { item_name, category, purchase_date, serial_number, item_image } = req.body;
  try {
    const item = new Item({
      item_name,
      category,
      purchase_date,
      serial_number,
      item_image,
      customer_id: req.customerId // Assuming customer ID is set via middleware
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all items for a specific customer
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ customer_id: req.customerId });
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  const { item_name, category, purchase_date, serial_number, item_image } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      { item_name, category, purchase_date, serial_number, item_image },
      { new: true }
    );
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.itemId);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json({ msg: 'Item deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
