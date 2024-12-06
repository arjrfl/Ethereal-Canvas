import Artwork from '../../../models/model-artwork.js';

export const artworks = async (req, res) => {
	try {
		const { status } = req.query;

		if (!status) {
			return res.status(400).json({ success: false, message: 'Missing status' });
		}

		const filter = { status };

		const artist = await Artwork.find(filter);
		res.status(200).json({ success: true, data: artist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
