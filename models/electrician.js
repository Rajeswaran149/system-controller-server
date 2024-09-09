const mongoose = require('mongoose');

   const ElectricianSchema = new mongoose.Schema({
     ID: String,
     Name: String,
     Contact: String,
     Occupation: String,
     status: { type: String, default: 'open' },
   });

   module.exports = mongoose.model('Electrician', ElectricianSchema);