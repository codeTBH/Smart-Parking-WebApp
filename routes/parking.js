import express from 'express';
import ParkingSpot from '../models/ParkingSpot.js';
const router = express.Router();

router.get('/parking_spots/:lotId', async (req, res) => {
    const { lotId } = req.params;
    const { zone } = req.query;
    const query = { lot_id: lotId };
    if (zone) query.zone = zone;
    const spots = await ParkingSpot.find(query);
    res.json(spots);
});

router.post('/claim_spot', async (req, res) => {
    const { spot_id } = req.body;
    const spot = await ParkingSpot.findOne({ spot_id });
    if (spot.status === 'occupied') return res.status(400).json({ message: 'Spot already occupied' });
    spot.status = 'occupied';
    await spot.save();
    res.json({ message: 'Spot claimed' });
});

router.post('/release_spot', async (req, res) => {
    const { spot_id } = req.body;
    const spot = await ParkingSpot.findOne({ spot_id });
    spot.status = 'available';
    await spot.save();
    res.json({ message: 'Spot released' });
});

export default router;