const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  functionalityDescription: { type: String, required: true },
  locationDescription: { type: String, required: true },
  contactPhone: { type: String, required: true },
  username: { type: String, required: true }, // Reference to the user who added the equipment
});

module.exports = mongoose.model('Equipment', equipmentSchema);
