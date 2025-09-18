import mongoose from 'mongoose';

const ParkingLotSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

export default mongoose.model('ParkingLot', ParkingLotSchema);