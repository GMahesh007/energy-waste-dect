const mongoose = require('mongoose');

const energyDataSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  powerUsage: { type: Number, required: true }, // in Watts
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EnergyData', energyDataSchema);
