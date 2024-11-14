import express from 'express';
import Artist from '../models/artist-model.js';

const router = express.Router();

// `PAGE`: retrieve pending artists
router.get('/pending-artist', async (req, res) => {
	try {
		const pendingArtists = await Artist.find({ status: 'Pending' });
		res.status(200).json({ success: true, data: pendingArtists });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// `PAGE`: retrieve approved artists
router.get('/approved-artist', async (req, res) => {
	try {
		const approvedArtists = await Artist.find({ status: 'Approved' });
		res.status(200).json({ success: true, data: approvedArtists });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// `PAGE`: retrieve rejected artists
router.get('/rejected-artist', async (req, res) => {
	try {
		const rejectedArtist = await Artist.find({ status: 'Rejected' });
		res.status(200).json({ success: true, data: rejectedArtist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// `BUTTON`: update artist status to "Approved"
router.patch('/artists/:id/approve', async (req, res) => {
	try {
		const { id } = req.params;
		const updatedArtist = await Artist.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });

		if (!updatedArtist) {
			return res.status(404).json({ success: false, message: 'Artist not found' });
		}

		res.status(200).json({ success: true, data: updatedArtist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// `BUTTON`: update artist status to "Rejected"
router.patch('/artists/:id/reject', async (req, res) => {
	try {
		const { id } = req.params;
		const updatedArtist = await Artist.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });

		if (!updatedArtist) {
			return res.status(404).json({ success: false, message: 'Artist not found' });
		}

		res.status(200).json({ success: true, data: updatedArtist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// `BUTTON`: delete artist from dashboard
router.delete('/artist/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deletedArtist = await Artist.findByIdAndDelete(id);

		if (!deletedArtist) {
			return res.status(404).json({ success: false, message: 'Artist not found' });
		}

		res.status(200).json({ success: true, message: 'Artist deleted' });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

export default router;
