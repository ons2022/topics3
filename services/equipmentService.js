const Equipment = require('../models/equipment');

// Add new equipment
const addEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json({ message: 'Equipment added successfully', equipment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Search for equipment
const searchEquipment = async (req, res) => {
  try {
    const { name, location } = req.query;
    const query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (location) query.locationDescription = new RegExp(location, 'i');
    const equipments = await Equipment.find(query);
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all equipment
const getAllEquipment = async (req, res) => {
  try {
    const equipments = await Equipment.find();
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get equipment by ID
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update equipment
const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
    res.json({ message: 'Equipment updated successfully', equipment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete equipment
const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addEquipment,
  searchEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment
};
