const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');
const Electrician = require('../models/electrician');

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new complaint
router.post('/', async (req, res) => {
  const complaint = new Complaint(req.body);
  try {
    // Round-Robin Assignment
    const electricians = await Electrician.find();
    if (electricians.length > 0) {
      const electrician = electricians[complaint.index % electricians.length];
      complaint.assignedTo = electrician._id;
      complaint.index = (complaint.index || 0) + 1;
    }
    const newComplaint = await complaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Close a complaint
router.patch('/:id/close', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    complaint.status = 'closed';
    complaint.resolutionDetails = req.body.resolutionDetails;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;