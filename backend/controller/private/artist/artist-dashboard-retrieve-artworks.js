import Artwork from '../../../models/model-artwork.js';

export const RetrieveArtworks = async (req, res) => {
	try {
		const { display, status } = req.body; // Get filters from the request body
		const artistId = req.user.id; // Extract artist ID from the authorized user

		// Create the filter object
		const filters = { user: artistId };

		if (display) {
			filters.display = display; // Filter by marketplace or museum
		}

		if (status) {
			filters.status = status; // Filter by pending, approve, or reject
		}

		// Fetch artworks based on the filters
		const artworks = await Artwork.find(filters).sort({ createdAt: -1 }); // Sort by latest

		// Respond with the filtered artworks
		res.status(200).json({
			success: true,
			data: artworks,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'An error occurred while retrieving artworks. Please try again later.',
		});
	}
};
