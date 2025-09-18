import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import parkingRoutes from './routes/parking.js';

dotenv.config();
const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection using .env file
if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI not set in .env file');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Landing page
app.get('/', (req, res) => res.render('index'));

// Dashboard page (simple for demo, shows all spots)
import ParkingSpot from './models/ParkingSpot.js';
app.get('/dashboard', async (req, res) => {
    const spots = await ParkingSpot.find({});
    res.render('dashboard', { user: { username: 'demo', role: 'Parker' }, spots });
});

// Routes
app.use('/api', authRoutes);
app.use('/api', parkingRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));