const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_items';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json({ limit: '10mb' }));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 