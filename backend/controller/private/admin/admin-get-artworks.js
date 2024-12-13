import Artwork from '../../../models/model-artwork.js';

export const artworks = async (req, res) => {
	try {
		const { status } = req.query;

		const filter = status ? { status } : {};

		const artwork = await Artwork.find(filter);

		res.status(200).json({ success: true, data: artwork });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
