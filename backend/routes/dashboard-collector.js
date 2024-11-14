import express from 'express';
import Collector from '../models/collector-model.js';

const router = express.Router();

// `PAGE`: retrieve collectors
router.get('/collectors', async (req, res) => {
	try {
		const collectors = await Collector.find({});
		res.status(200).json({ success: true, data: collectors });
	} catch (error) {
		console.log('error in fetching collectors: ', error);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
});

// `PAGE`: retrieve disabled collectors
router.get('/collectors/disabled', async (req, res) => {
	try {
		const collectors = await Collector.find({ status: 'Disabled' });
		res.status(200).json({ success: true, data: collectors });
	} catch (error) {
		console.log('error in fetching collectors: ', error);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
});

// `BUTTON`: update artist status to "Disabled"
router.patch('/collectors/:id/reject', async (req, res) => {
	try {
		const { id } = req.params;
		const updatedArtist = await Collector.findByIdAndUpdate(
			id,
			{ status: 'Disabled' },
			{ new: true }
		);

		if (!updatedArtist) {
			return res.status(404).json({ success: false, message: 'Artist not found' });
		}

		res.status(200).json({ success: true, data: updatedArtist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// `BUTTON`: delete collector from dashboard
router.delete('/collectors/:id', async (req, res) => {
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
