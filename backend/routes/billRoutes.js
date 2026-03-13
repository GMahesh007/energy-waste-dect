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

    // Send req.file to the Python AI Module via HTTP
    const fs = require('fs');
    const FormData = require('form-data');
    const axios = require('axios');
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));

    const pythonRes = await axios.post('http://localhost:8000/parse-bill', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    const aiData = pythonRes.data;
    
    // Check if aiData has insights, if not use fallback
    const mockParsedData = {
      filename: aiData.filename || req.file.originalname,
      billingPeriod: aiData.billingPeriod || 'Current Cycle',
      totalKWh: aiData.totalKWh || 0,
      totalCost: aiData.totalCost || 0,
      insights: aiData.insights || ["No specific insights available. Ensure your bill is clear and readable."]
    };

    // Clean up uploaded file
    fs.unlink(req.file.path, (err) => {
      if(err) console.error("Failed to delete temp file:", err);
    });

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

// GET /api/latest-bill
router.get('/latest-bill', async (req, res) => {
  try {
    const latestBill = await BillRecord.findOne().sort({ createdAt: -1 });
    if (!latestBill) return res.status(404).json({ message: 'No bills found.' });
    return res.status(200).json(latestBill);
  } catch (error) {
    console.error('Error fetching latest bill:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
