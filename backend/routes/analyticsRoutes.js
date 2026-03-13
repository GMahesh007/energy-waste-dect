const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const EnergyData = require('../models/EnergyData');
const Alert = require('../models/Alert');
const Recommendation = require('../models/Recommendation');

// GET /api/analytics
router.get('/analytics', async (req, res) => {
  try {
    // Mocking analytics data matching the frontend mock for now
    // In production, this would aggregate data from MongoDB and Python AI
    const data = {
      energyData: [
        { time: '00:00', kwh: 1.2 },
        { time: '04:00', kwh: 0.8 },
        { time: '08:00', kwh: 2.5 },
        { time: '12:00', kwh: 3.4 },
        { time: '16:00', kwh: 4.8 },
        { time: '20:00', kwh: 5.2 },
        { time: '23:59', kwh: 2.1 },
      ],
      devices: [
        { name: 'Air Conditioner', usage: 45 },
        { name: 'Refrigerator', usage: 25 },
        { name: 'Water Heater', usage: 15 },
        { name: 'Lighting', usage: 10 },
        { name: 'Other', usage: 5 },
      ],
      metrics: {
        totalUsageToday: "24.8 kWh",
        currentDraw: "1.2 kW",
        activeDevices: 8
      }
    };
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching analytics' });
  }
});

// GET /api/recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const recs = await Recommendation.find().sort({ createdAt: -1 }).limit(10);
    res.json(recs);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching recommendations' });
  }
});

// GET /api/alerts
router.get('/alerts', async (req, res) => {
    try {
      const alerts = await Alert.find({ isResolved: false }).sort({ createdAt: -1 }).populate('deviceId');
      res.json(alerts);
    } catch (err) {
      res.status(500).json({ error: 'Server error fetching alerts' });
    }
  });

module.exports = router;
