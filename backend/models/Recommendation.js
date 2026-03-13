const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  potentialSavings: { type: String }, // e.g. "10% per month" or "$15"
  relatedDeviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
