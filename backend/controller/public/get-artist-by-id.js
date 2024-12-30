import Artist from '../../models/model-artist.js';

export const getArtistById = async (req, res) => {
	try {
		const { id } = req.params;

		const artist = await Artist.findById(id).populate({
			path: 'artworks',
			match: { status: 'approve' }, // Filter condition for populated artworks
		});

		if (!artist) {
			return res.status(404).json({ message: 'Artist not found' });
		}

		return res.status(200).json(artist);
	} catch (error) {
		console.error('Error fetching artist:', error);
		return res.status(500).json({
			message: 'An error occurred while fetching artist details. Please try again later.',
		});
	}
};
