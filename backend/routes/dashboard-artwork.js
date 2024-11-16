import express from 'express';
import Artwork from '../models/artwork-upload-model.js';

const router = express.Router();

// endpoint:
// admin/artwork
// admin/artwork?status=Approve
// admin/artwork?status=Pending
// admin/artwork?status=Reject

// admin/artwork?status=Approve&displaySection (ALL)
// admin/artwork?status=Approve&displaySection=Museum (MUSEUM)
// admin/artwork?status=Approve&displaySection=Marketplace (MARKETPLACE)
// `PAGE`: retrieve artwork and sort (all, museum, marketplace) from Approve status
router.get('/artwork', async (req, res) => {
	try {
		const { status, displaySection } = req.query;
		const filter = {};

		if (status) {
			filter.status = status;
		}

		if (displaySection) {
			filter.displaySection = displaySection;
		} else {
			filter.displaySection = { $in: ['Museum', 'Marketplace'] };
		}

		const artworks = await Artwork.find(filter);
		res.status(200).json({ success: true, data: artworks });
	} catch (error) {
		res.status(500).json({ message: 'Error fetching artworks', error });
	}
});

// endpoint:
// /admin/artwork/12345/Approve
// /admin/artwork/54321/Reject
// `BUTTON`: update status to Approve or Reject
router.patch('/artwork/:id/:status', async (req, res) => {
	try {
		const { id, status } = req.params;
		const validStatuses = ['Approve', 'Reject'];

		if (!validStatuses.includes(status)) {
			return res.status(400).json({ success: false, message: 'Invalid status value' });
		}

		const updateArtwork = await Artwork.findByIdAndUpdate(id, { status }, { new: true });

		if (!updateArtwork) {
			return res.status(404).json({ success: false, message: 'Artwork not found' });
		}

		res.status(200).json({ success: true, data: updateArtwork });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// `BUTTON`: delete artwork from database
router.delete('/artwork/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deletedArtist = await Artwork.findByIdAndDelete(id);

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
