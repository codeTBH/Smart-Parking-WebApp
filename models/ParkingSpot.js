import mongoose from 'mongoose';

const ParkingSpotSchema = new mongoose.Schema({
    lot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot', required: true },
    spot_id: { type: String, required: true },
    zone: { type: String, enum: ['Standard', 'Handicap', 'EV Charger'], required: true },
    status: { type: String, enum: ['available', 'occupied'], default: 'available' }
});

export default mongoose.model('ParkingSpot', ParkingSpotSchema);