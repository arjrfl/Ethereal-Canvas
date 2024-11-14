import express from 'express';
import Artist from '../models/artist-model.js';
import Collector from '../models/collector-model.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// ARTIST - PAGE - REGISTRATION
router.post('/artist', async (req, res) => {
	const { firstName, lastName, email, phone, validId, selfieWithId, sharedDrive } = req.body;

	if (!firstName || !lastName || !email || !phone || !validId || !selfieWithId || !sharedDrive) {
		return res.status(400).json({ success: false, message: 'Provide missing fields' });
	}

	const existingArtist = await Artist.findOne({ email });
	if (existingArtist) {
		return res.status(400).json({ success: false, message: 'Email is already in use' });
	}

	const newArtist = new Artist(req.body);

	try {
		await newArtist.save();
		res.status(201).json({ success: true, data: newArtist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// COLLECTOR - PAGE - REGISTRATION
router.post('/collector', async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ success: false, message: 'Provide missing fields' });
	}

	const existingCollector = await Collector.findOne({ email });
	if (existingCollector) {
		return res.status(400).json({ success: false, message: 'Email is already in use' });
	}

	try {
		const newCollector = new Collector({
			...req.body,
			password: await bcrypt.hash(password, 10),
		});

		await newCollector.save();
		res.status(201).json({ success: true, data: newCollector });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

export default router;
