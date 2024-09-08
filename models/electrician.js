const mongoose = require('mongoose');

   const ElectricianSchema = new mongoose.Schema({
     ID: String,
     Name: String,
     Contact: String,
     Occupation: String
   });

   module.exports = mongoose.model('Electrician', ElectricianSchema);