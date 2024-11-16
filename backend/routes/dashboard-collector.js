import express from 'express';
import Collector from '../models/collector-model.js';

const router = express.Router();

// endpoint:
// /admin/collector?status=Approve
// /admin/collector?status=Disable
// `PAGE`: retrieve Approve, Disable status
router.get('/collector', async (req, res) => {
	try {
		const { status } = req.query;
		const validStatuses = ['Approve', 'Disable'];

		if (!validStatuses.includes(status)) {
			return res.status(400).json({ success: false, message: 'Invalid status value' });
		}

		const filter = { status };
		const collector = await Collector.find(filter);
		res.status(200).json({ success: true, data: collector });
	} catch (error) {}
});

// `BUTTON`: update artist status to "Disabled"
router.patch('/collector/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const updatedArtist = await Collector.findByIdAndUpdate(
			id,
			{ status: 'Disable' },
			{ new: true }
		);

		if (!updatedArtist) {
			return res.status(404).json({ success: false, message: 'Collector not found' });
		}

		res.status(200).json({ success: true, data: updatedArtist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// `BUTTON`: delete collector from dashboard
router.delete('/collector/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deletedCollector = await Collector.findByIdAndDelete(id);

		if (!deletedCollector) {
			return res.status(404).json({ success: false, message: 'Collector not found' });
		}

		res.status(200).json({ success: true, message: 'Collector deleted' });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

export default router;
