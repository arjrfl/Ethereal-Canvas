import Artist from '../../../models/model-artist.js';

export const artistGetProfile = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				success: false,
				message: 'Missing Id',
			});
		}

		const artist = await Artist.findById(id);

		if (!artist) {
			return res.status(404).json({
				success: false,
				message: 'Artist not found',
			});
		}

		// RESPONSE
		return res.status(200).json({
			success: true,
			data: {
				fullName: artist.fullName,
				avatar: artist.avatar,
				email: artist.email,
			},
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: 'Server error', error: error.message });
	}
};
