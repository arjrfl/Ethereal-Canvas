import express from 'express';
import Artwork from '../models/artwork-upload-model.js';

const router = express.Router();

router.post('/upload-artwork', async (req, res) => {
	const { artworkTitle, artistName, description, displaySection, images } = req.body;

	if (!artworkTitle || !artistName || !description || !displaySection || !images) {
		return res.status(400).json({ success: true, message: 'Provide missing fields' });
	}

	const newArtwork = new Artwork(req.body);

	try {
		await newArtwork.save();
		res.status(201).json({ success: true, data: newArtwork });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

export default router;
