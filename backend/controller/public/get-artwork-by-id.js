import Artwork from '../../models/model-artwork.js'; // Adjust the path to your Artwork model

export const getArtworkById = async (req, res) => {
	try {
		const { id } = req.params;

		// Fetch the artwork by ID and populate the 'user' field
		const artwork = await Artwork.findById(id).populate(
			'user',
			'fullName email avatar location createdAt'
		);

		// Handle artwork not found
		if (!artwork) {
			return res.status(404).json({ message: 'Artwork not found' });
		}

		// Return the artwork details
		return res.status(200).json(artwork);
	} catch (error) {
		// Log and handle server errors
		console.error('Error fetching artwork:', error);
		return res.status(500).json({
			message: 'An error occurred while fetching artwork details. Please try again later.',
		});
	}
};
