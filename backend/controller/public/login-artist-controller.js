import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Artist from '../../models/model-artist.js';

export const loginArtist = async (req, res) => {
	const { email, password } = req.body;

	try {
		const artist = await Artist.findOne({ email }).select('+password');

		if (!artist) {
			return res.status(404).json({ error: 'Artist not found' });
		}

		const isMatch = await bcrypt.compare(password, artist.password);

		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		if (!process.env.JWT_SECRET || !process.env.JWT_SECRET_REFRESH) {
			return res.status(500).json({
				error: 'Server configuration error: JWT_SECRET or JWT_SECRET_REFRESH is not defined',
			});
		}

		const accessToken = jwt.sign(
			{
				id: artist._id,
				role: artist.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		const refreshToken = jwt.sign(
			{
				id: artist._id,
				role: artist.role,
			},
			process.env.JWT_SECRET_REFRESH,
			{
				expiresIn: '7d',
			}
		);

		if (!accessToken || !refreshToken) {
			return res.status(500).json({ error: 'Token generation failed' });
		}

		artist.refreshToken = refreshToken;
		await artist.save();

		res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
	} catch (error) {
		console.error('Error during login:', error.message);
		res.status(500).json({ error: 'Error logging in', details: error.message });
	}
};
