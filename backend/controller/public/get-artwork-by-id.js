import Artwork from '../../models/model-artwork.js'; // Adjust the path to your Artwork model

export const getArtworkById = async (req, res) => {
	try {
		const { id } = req.params;

		const artwork = await Artwork.findById(id).populate(
			'user',
			'fullName email avatar location createdAt'
		);

		if (!artwork) {
			return res.status(404).json({ message: 'Artwork not found' });
		}

		return res.status(200).json(artwork);
	} catch (error) {
		console.error('Error fetching artwork:', error);
		return res.status(500).json({
			message: 'An error occurred while fetching artwork details. Please try again later.',
		});
	}
};
