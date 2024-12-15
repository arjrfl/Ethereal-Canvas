import jwt from 'jsonwebtoken';
import Admin from '../../models/model-admin.js';
import Artist from '../../models/model-artist.js';
import Collector from '../../models/model-collector.js';

export const refreshToken = async (req, res) => {
	const { refreshToken } = req.body;

	// Step 1: Ensure the refresh token is provided
	if (!refreshToken) {
		return res.status(400).json({ error: 'Refresh token is missing' }); // Use 400 instead of 401
	}

	try {
		// Step 2: Verify the refresh token
		const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

		// Step 3: Dynamically select the model based on the user's role
		let user;
		if (decoded.role === 'admin') {
			user = await Admin.findById(decoded.id).select('+refreshToken');
		} else if (decoded.role === 'artist') {
			user = await Artist.findById(decoded.id).select('+refreshToken');
		} else if (decoded.role === 'collector') {
			user = await Collector.findById(decoded.id).select('+refreshToken');
		}

		// Step 4: Validate the user and refresh token
		if (!user || user.refreshToken !== refreshToken) {
			return res.status(403).json({ error: 'Invalid refresh token' });
		}

		// Step 5: Generate new access token and optionally refresh token
		const newAccessToken = jwt.sign(
			{
				id: user._id,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '20m', // Access token expires in 1 hour
			}
		);

		// Optionally generate a new refresh token (rotate the refresh token)
		const newRefreshToken = jwt.sign(
			{
				id: user._id,
				role: user.role,
			},
			process.env.JWT_SECRET_REFRESH,
			{
				expiresIn: '7d', // Refresh token expires in 7 days (or any duration you prefer)
			}
		);

		// Save the new refresh token to the user model (if rotating refresh tokens)
		user.refreshToken = newRefreshToken;
		await user.save();

		// Step 6: Return the new access token and refresh token
		return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
	} catch (error) {
		console.error('Error validating refresh token:', error.message);
		return res.status(403).json({ error: 'Invalid or expired refresh token' });
	}
};
