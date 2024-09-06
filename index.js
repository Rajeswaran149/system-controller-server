const express = require('express');
const app = express();
const mongoose = require('mongoose')

require("dotenv").config();

app.use('/', (req,res) => {
    res.send("server is running sucessfully")
})


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));


app.listen(5000, () => console.log('Server running on port 5000'));