const mongoose = require('mongoose');

const billRecordSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  billingPeriod: { type: String },
  totalKWh: { type: Number },
  totalCost: { type: Number },
  parsedText: { type: String },
  insights: [{ type: String }], // AI generated insights stored here
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BillRecord', billRecordSchema);
