import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import ParkingLot from './models/ParkingLot.js';
import ParkingSpot from './models/ParkingSpot.js';

dotenv.config();

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Clear existing data
    await User.deleteMany({});
    await ParkingLot.deleteMany({});
    await ParkingSpot.deleteMany({});

    // Create demo user
    const user = await User.create({ username: 'demo', password: 'demo123', role: 'Parker' });

    // Create demo parking lot
    const lot = await ParkingLot.create({ name: 'Main Lot' });

    // Create demo parking spots
    const spots = [];
    const zones = ['Standard', 'Handicap', 'EV Charger'];
    for (let i = 1; i <= 15; i++) {
        const zone = zones[i % zones.length];
        spots.push({ lot_id: lot._id, spot_id: `S${i}`, zone, status: 'available' });
    }
    await ParkingSpot.insertMany(spots);

    console.log('Demo data seeded successfully');
    mongoose.disconnect();
};

seed();