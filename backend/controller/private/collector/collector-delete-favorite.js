import Collector from '../../../models/model-collector.js';

export const updateFavorites = async (req, res) => {
	try {
		const { collectorId, artworkId } = req.body;

		if (!collectorId || !artworkId) {
			return res.status(400).json({ message: 'Collector ID and Artwork ID are required.' });
		}

		const collector = await Collector.findByIdAndUpdate(
			collectorId,
			{
				$pull: {
					favorites: artworkId,
				},
			},

			{
				new: true,
			}
		);

		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		res.status(200).json({
			success: true,
			favorites: collector.favorites,
		});
	} catch (error) {
		console.error('Error updating favorites:', error);
		res.status(500).json({ success: false, error: error.message });
	}
};
