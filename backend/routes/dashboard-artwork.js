import express from 'express';
import Artwork from '../models/artwork-upload-model.js';

const router = express.Router();

// `PAGE`: retrieve artwork and sort (all, museum, marketplace) from Approve status
// endpoint:
// admin/artworks
// admin/artworks?status=Approve
// admin/artworks?status=Pending
// admin/artworks?status=Reject

// admin/artworks?status=Approve&displaySection (ALL)
// admin/artworks?status=Approve&displaySection=Museum (MUSEUM)
// admin/artworks?status=Approve&displaySection=Marketplace (MARKETPLACE)
router.get('/artworks', async (req, res) => {
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

// `BUTTON`: update status to Approve or Reject
// endpoint:
// /admin/artwork/12345/Approve
// /admin/artwork/54321/Reject
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
