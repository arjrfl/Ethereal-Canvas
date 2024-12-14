import Collector from '../../../models/model-collector.js';
import Artist from '../../../models/model-artist.js';

// Artists endpoint: Filtering by status and providing summary
export const artists = async (req, res) => {
	try {
		const { status } = req.query;

		const filter = status ? { status } : {};

		// Fetch artists based on the filter
		const artists = await Artist.find(filter).sort({ createdAt: -1 });

		// Fetch counts for all statuses
		const statusCounts = await Artist.aggregate([
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 },
				},
			},
		]);

		// Transform to a key-value format
		const statusSummary = statusCounts.reduce((acc, { _id, count }) => {
			acc[_id] = count;
			return acc;
		}, {});

		res.status(200).json({
			success: true,
			data: artists,
			statusSummary,
		});
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

		// Fetch collectors based on the filter
		const collectors = await Collector.find(filter).sort({ createdAt: -1 });

		// Fetch counts for all statuses
		const statusCounts = await Collector.aggregate([
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 },
				},
			},
		]);

		// Transform to a key-value format
		const statusSummary = statusCounts.reduce((acc, { _id, count }) => {
			acc[_id] = count;
			return acc;
		}, {});

		res.status(200).json({
			success: true,
			data: collectors,
			statusSummary,
		});
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: 'Error fetching collectors', error });
	}
};
