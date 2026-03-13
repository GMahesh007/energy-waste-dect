const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const BillRecord = require('../models/BillRecord');

// POST /api/upload-bill
router.post('/upload-bill', upload.single('billFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Here we would typically send req.file.path to the Python AI Module via HTTP
    // For now, we simulate a successful parse and recommendation generation.
    
    // Simulating Python AI module response
    const mockParsedData = {
      filename: req.file.originalname,
      billingPeriod: 'Mar 2026',
      totalKWh: 850,
      totalCost: 120.50,
      insights: [
        "Your consumption of 850 kWh is 15% higher than similar households.",
        "Consider adjusting your AC thermostat by 2 degrees to save up to $15 next month."
      ]
    };

    const newBill = new BillRecord(mockParsedData);
    await newBill.save();

    return res.status(200).json({
      message: 'Bill uploaded and parsed successfully!',
      data: newBill
    });
  } catch (error) {
    console.error('Error uploading bill:', error);
    return res.status(500).json({ error: 'Internal server error during upload.' });
  }
});

module.exports = router;
