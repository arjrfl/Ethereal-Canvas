import jwt from 'jsonwebtoken';
import Admin from '../../models/model-admin.js';
import Artist from '../../models/model-artist.js';
import Collector from '../../models/model-collector.js';

export const refreshToken = async (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({ error: 'Refresh token is missing' });
	}

	try {
		const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

		let user;

		if (decoded.role === 'admin') {
			user = await Admin.findById(decoded.id).select('+refreshToken');
		} else if (decoded.role === 'artist') {
			user = await Artist.findById(decoded.id).select('+refreshToken');
		} else if (decoded.role === 'collector') {
			user = await Collector.findById(decoded.id).select('+refreshToken');
		}

		if (!user || user.refreshToken !== refreshToken) {
			return res.status(403).json({ error: 'Invalid refresh token' });
		}

		const accessToken = jwt.sign(
			{
				id: user._id,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1h',
			}
		);

		res.status(200).json({ accessToken });
	} catch (error) {
		console.error('Error validating refresh token:', error.message);
		return res.status(403).json({ error: 'Invalid or expired refresh token' });
	}
};
