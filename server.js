require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');
const itemRoutes = require('./routes/itemRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');

const cors=require("cors");
app.use(
  cors({
    origin:"http://localhost:5173/",
  })
)

const app = express();
connectDB();

app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));