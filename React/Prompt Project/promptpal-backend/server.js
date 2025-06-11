const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const promptRoutes = require('./routes/promptRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('PromptPal Backend is running 🚀');
});


app.use(cors());
app.use(express.json());
app.use('/api/prompts', promptRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
