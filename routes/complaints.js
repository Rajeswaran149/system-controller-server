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
router.post('/add', async (req, res) => {
  const complaint = new Complaint(req.body);
  try {
    // Round-Robin Assignment
    const electricians = await Electrician.find();
    if (electricians.length > 0) {
      const electrician = electricians.find(e => e.status === 'open');
      if (electrician) {
        complaint.assignedTo = electrician.ID;
        complaint.status = 'in-progress';
        electrician.status = 'working';
        const updateStatusELectrician = await electrician.save();
        console.log(updateStatusELectrician)
      }
    }
    const newComplaint = await complaint.save();
    console.log(newComplaint);
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(id)

    // Use findOneAndDelete to delete by a non-ObjectId field
    const deletedElectrician = await Complaint.findOneAndDelete({ ID: id });

    if (!deletedElectrician) {
      return res.status(404).json({ message: 'Electrician not found' });
    }

    res.status(200).json({ message: 'Electrician deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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