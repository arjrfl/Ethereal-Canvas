import Artist from '../../../models/model-artist.js';

export const ArtistRemoveAvatar = async (req, res) => {
	try {
		const { avatar } = req.body; // Get the avatar URL from the request body
		const userId = req.user.id; // Assuming the user ID is added to req.user by your middleware

		// Validate input (now handling the case where avatar is null)
		if (avatar === undefined) {
			return res.status(400).json({ message: 'Avatar URL is required.' });
		}

		// Find and update the user's avatar
		const artist = await Artist.findById(userId);
		if (!artist) {
			return res.status(404).json({ message: 'User not found.' });
		}

		// If avatar is null, remove the avatar
		artist.avatar = avatar; // Can be null to remove it
		await artist.save();

		return res.status(200).json({
			message: 'Avatar updated successfully.',
			avatar: artist.avatar,
		});
	} catch (error) {
		console.error('Error updating avatar:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
};
