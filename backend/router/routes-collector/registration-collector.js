import express from 'express';
import Collector from '../../models/model-collector.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// COLLECTOR - PAGE - REGISTRATION
router.post('/register/collector', async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		const existingCollector = await Collector.findOne({ email });

		if (existingCollector) {
			return res.status(400).json({ error: 'Email is already registered' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newCollector = new Collector({ fullName, email, password: hashedPassword });

		await newCollector.save();
		res.status(201).json({ message: 'Collector account created successfully!' });
	} catch (error) {
		res.status(500).json({ error: 'Error creating collector account', details: error.message });
	}
});

export default router;
