import Collector from '../../../models/model-collector.js';

export const getCollectorFavorites = async (req, res) => {
	try {
		const collectorId = req.user.id; // Collector ID from the logged-in user
		const collector = await Collector.findById(collectorId).populate({
			path: 'favorites', // Populate the 'favorites' array
			select: 'images title artistName yearCreated display medium', // Select specific fields to populate
		});

		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		// Send the populated artworks back
		res.status(200).json({
			message: 'Favorites fetched successfully.',
			favorites: collector.favorites,
		});
	} catch (error) {
		console.error('Error fetching favorites:', error);
		res.status(500).json({ message: 'Server error.' });
	}
};
