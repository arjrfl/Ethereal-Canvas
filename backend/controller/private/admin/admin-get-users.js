import Artist from '../../../models/model-artist.js';
import Collector from '../../../models/model-collector.js';

// Artists endpoint: Filtering by status
// /api/admin/artist?status=approve
// /api/admin/artist?status=pending
// /api/admin/artist?status=rejected
export const artists = async (req, res) => {
	try {
		const { status } = req.query;

		const filter = status ? { status } : {};

		const artists = await Artist.find(filter).sort({ createdAt: -1 });

		res.status(200).json({ success: true, data: artists });
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: 'Error fetching artists', error });
	}
};

// Collectors endpoint: Filtering by status (active or disable)
// /api/admin/collector?status=active
// /api/admin/collector?status=disable
export const collectors = async (req, res) => {
	try {
		const { status } = req.query;

		const filter = status ? { status } : {};

		const collector = await Collector.find(filter).sort({ createdAt: -1 });

		res.status(200).json({ success: true, data: collector });
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: 'Error fetching collector', error });
	}
};
