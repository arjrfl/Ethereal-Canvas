import Collector from '../../../models/model-collector.js';
import Artist from '../../../models/model-artist.js';
import Admin from '../../../models/model-admin.js';

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

export const admins = async (req, res) => {
	try {
		// Retrieve all admins from the database
		const admins = await Admin.find({}, '-password -refreshToken'); // Exclude sensitive fields

		if (!admins || admins.length === 0) {
			return res.status(404).json({ error: 'No admins found' });
		}

		// Respond with the list of admins
		res.status(200).json({
			message: 'Admins retrieved successfully',
			data: admins,
		});
	} catch (error) {
		console.error('Error retrieving admins:', error.message);
		res
			.status(500)
			.json({ error: 'An error occurred while retrieving admins', details: error.message });
	}
};
