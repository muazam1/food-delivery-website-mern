const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const dns = require('dns');

// Fix for querySrv ETIMEOUT / ECONNREFUSED
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Content-Type:', req.headers['content-type']);
    next();
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/recipes', recipeRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
