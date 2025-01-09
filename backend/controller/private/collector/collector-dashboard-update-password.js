import Collector from '../../../models/model-collector.js';
import bcrypt from 'bcryptjs';

export const collectorChangePassword = async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const collectorId = req.user.id;

	try {
		const collector = await Collector.findById(collectorId).select('+password');
		if (!collector) return res.status(404).json({ message: 'User not found.' });

		// Verify current password
		const isMatch = await bcrypt.compare(currentPassword, collector.password);
		if (!isMatch) return res.status(400).json({ message: 'Incorrect current password.' });

		// Hash new password and update
		const salt = await bcrypt.genSalt(10);
		collector.password = await bcrypt.hash(newPassword, salt);
		await collector.save();

		res.status(200).json({ message: 'Password changed successfully.' });
	} catch (error) {
		console.error('Error changing password:', error);
		res.status(500).json({ message: 'Server error.' });
	}
};
