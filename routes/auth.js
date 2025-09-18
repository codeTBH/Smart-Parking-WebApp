import express from 'express';
import User from '../models/User.js';
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
        if (username === 'demo' && password === 'demo123') {
            user = await User.create({ username: 'demo', password: 'demo123', role: 'Parker' });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    if (user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ username: user.username, role: user.role });
});
export default router;