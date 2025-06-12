const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user');
const inventoryRoutes = require('./routes/inventory');
const invoiceRoutes = require('./routes/invoice');
const reportRoutes = require('./routes/report');
const salesRoutes = require('./routes/sales');

const { authenticateJWT } = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('Database connected'))
  .catch(err=>console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/inventory', authenticateJWT, inventoryRoutes);
app.use('/api/invoices', authenticateJWT, invoiceRoutes);
app.use('/api/reports', authenticateJWT, reportRoutes);
app.use('/api/sales', authenticateJWT, salesRoutes);

app.get('/', (_, res) => res.send('Foley\'s Place API running.'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
