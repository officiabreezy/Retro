const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profileRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.use('/api/auth', authRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})