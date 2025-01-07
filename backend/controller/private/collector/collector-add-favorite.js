import Collector from '../../../models/model-collector.js';
import Artwork from '../../../models/model-artwork.js';

export const addFavorite = async (req, res) => {
	const { collectorId, artworkId } = req.body;

	try {
		const collector = await Collector.findById(collectorId);
		if (!collector) {
			return res.status(404).json({ message: 'Collector not found' });
		}

		const artwork = await Artwork.findById(artworkId);
		if (!artwork) {
			return res.status(404).json({ message: 'Artwork not found' });
		}

		// Check if the artwork is already in the favorites list
		if (collector.favorites?.includes(artworkId)) {
			return res.status(400).json({ message: 'Artwork already in favorites' });
		}

		// Add the artwork to the favorites list
		collector.favorites = [...(collector.favorites || []), artworkId];
		await collector.save();

		res.status(200).json({ message: 'Artwork added to favorites successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
