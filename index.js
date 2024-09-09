const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const electricianRoutes = require('./routes/electricians');
const complaintRoutes = require('./routes/complaints');

require("dotenv").config();
app.use(cors({origin:'*'}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));

    app.use('/api/electricians', electricianRoutes);
    app.use('/api/complaints', complaintRoutes);
    app.use('/', (req,res) => {
        res.send("server is running sucessfully")
    })



app.listen(5000, () => console.log('Server running on port 5000'));