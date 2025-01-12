import Artist from '../../../models/model-artist.js';
import bcrypt from 'bcryptjs';

export const artistChangePassword = async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const artistId = req.user.id;

	try {
		const artist = await Artist.findById(artistId).select('+password');
		if (!artist) return res.status(404).json({ message: 'User not found.' });

		// Verify current password
		const isMatch = await bcrypt.compare(currentPassword, artist.password);
		if (!isMatch) return res.status(400).json({ message: 'Incorrect current password.' });

		// Hash new password and update
		const salt = await bcrypt.genSalt(10);
		artist.password = await bcrypt.hash(newPassword, salt);
		await artist.save();

		res.status(200).json({ message: 'Password changed successfully.' });
	} catch (error) {
		console.error('Error changing password:', error);
		res.status(500).json({ message: 'Server error.' });
	}
};
