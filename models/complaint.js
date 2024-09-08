const mongoose = require('mongoose');

   const ComplaintSchema = new mongoose.Schema({
     category: String,
     description: String,
     customerName: String,
     customerAddress: String,
     status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
     assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Electrician' }
   });

   module.exports = mongoose.model('Complaint', ComplaintSchema);