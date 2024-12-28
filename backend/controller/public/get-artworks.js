import Artwork from '../../models/model-artwork.js';

export const getArtworks = async (req, res) => {
	try {
		const { display, medium } = req.query;

		const query = { status: 'approve' };
		if (display) {
			query.display = display;
		}
		if (medium) {
			query.medium = medium;
		}

		const artworks = await Artwork.find(query).populate('user', 'fullName avatar email location'); // Populate user fields (fullName, avatar, email)

		res.status(200).json({
			success: true,
			data: artworks,
		});
	} catch (error) {
		console.error('Error fetching artworks with artist data:', error);
		res.status(500).json({ error: 'Error fetching artworks', details: error.message });
	}
};
