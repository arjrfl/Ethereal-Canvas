import Collector from '../../../models/model-collector.js';

export const checkFavorite = async (req, res) => {
	try {
		const { collectorId, artworkId } = req.body;

		// Validate inputs
		if (!collectorId || !artworkId) {
			return res.status(400).json({ message: 'Collector ID and Artwork ID are required.' });
		}

		// Fetch the collector and check if the artwork is in their favorites
		const collector = await Collector.findById(collectorId);

		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		// Check if the artworkId exists in the collector's favorites array
		const isFavorite = collector.favorites.includes(artworkId);

		res.status(200).json({ isFavorite });
	} catch (error) {
		console.error('Error checking favorite:', error);
		res.status(500).json({ message: 'Failed to check favorite status.', error: error.message });
	}
};
