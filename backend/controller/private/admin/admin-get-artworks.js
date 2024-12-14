import Artwork from '../../../models/model-artwork.js';

export const artworks = async (req, res) => {
	try {
		const { status } = req.query;

		// Filter based on the status query parameter
		const filter = status ? { status } : {};

		// Fetch artworks based on the filter
		const artwork = await Artwork.find(filter).sort({ createdAt: -1 });

		// Fetch counts for all statuses
		const statusCounts = await Artwork.aggregate([
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 },
				},
			},
		]);

		// Transform the aggregation result into a key-value format for easy access
		const statusSummary = statusCounts.reduce((acc, { _id, count }) => {
			acc[_id] = count;
			return acc;
		}, {});

		// Respond with both the filtered artworks and the status summary
		res.status(200).json({
			success: true,
			data: artwork,
			statusSummary,
		});
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
