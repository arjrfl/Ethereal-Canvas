import Artist from '../../models/model-artist.js';

export const validateArtistEmail = async (req, res) => {
	const { email } = req.params;

	try {
		const existingArtist = await Artist.findOne({ email });
		if (existingArtist) {
			return res.status(409).json({ success: false, message: 'Email is already in use' });
		}
		return res.status(200).json({ success: true, message: 'Email is available' });
	} catch (error) {
		console.error(`Error checking email: ${error.message}`);
		return res.status(500).json({ success: false, message: 'Server error' });
	}
};
