const express = require('express');
   const router = express.Router();
   const Electrician = require('../models/electrician');

   // Get all electricians
   router.get('/', async (req, res) => {
     try {
       const electricians = await Electrician.find();
      //  console.log(electricians)
       res.json(electricians);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });

   // Add a new electrician
   router.post('/add', async (req, res) => {
     const electrician = new Electrician(req.body);
    //  console.log(electrician)
     try {
       const newElectrician = await electrician.save();
       res.status(201).json(newElectrician);
     } catch (err) {
       res.status(400).json({ message: err.message });
     }
   });

   // Edit a electrician
   router.post('/edit', async (req, res) => {
    const editObj = req.body;
  
    // Ensure required field ID is provided
    if (!editObj.ID) {
      return res.status(400).json({ message: 'ID is required' });
    }
  
    try {
      // Find the electrician by the custom field ID and update it with the new data
      const updatedElectrician = await Electrician.findOneAndUpdate(
        { ID: editObj.ID }, // Query to find the document by ID
        editObj, // Data to update
        { new: true, runValidators: true } // Options
      );
  
      if (!updatedElectrician) {
        return res.status(404).json({ message: 'Electrician not found' });
      }
      const electricians = await Electrician.find();
      res.status(200).json(electricians);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params; 
      console.log(id)

      // Use findOneAndDelete to delete by a non-ObjectId field
      const deletedElectrician = await Electrician.findOneAndDelete({ ID: id });
  
      if (!deletedElectrician) {
        return res.status(404).json({ message: 'Electrician not found' });
      }
  
      res.status(200).json({ message: 'Electrician deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

   module.exports = router;