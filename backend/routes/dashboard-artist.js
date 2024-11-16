import express from 'express';
import Artist from '../models/artist-model.js';

const router = express.Router();

// endpoint:
// /admin/artist?status=Approve
// /admin/artist?status=Pending
// /admin/artist?status=Reject
// `PAGE`: retrieve APPROVE, PENDING, REJECT
router.get('/artist', async (req, res) => {
	try {
		const { status } = req.query;

		if (!status) {
			return res.status(400).json({ success: false, message: 'Missing status' });
		}

		const filter = { status };

		const artist = await Artist.find(filter);
		res.status(200).json({ success: true, data: artist });
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: 'Error fetching artworks', error });
	}
});

// endpoint: FOR STATUS = PENDING
// /admin/artist/67386c3f3ae109bcd2af994a/Approve
// /admin/artist/67386c3f3ae109bcd2af994a/Reject
// `BUTTON`: update pending artist (to APPROVE OR REJECT)
router.patch('/artist/:id/:status', async (req, res) => {
	try {
		const { id, status } = req.params;
		const updateArtist = await Artist.findByIdAndUpdate(id, { status: `${status}` }, { new: true });
		res.status(200).json({ success: true, data: updateArtist });
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
