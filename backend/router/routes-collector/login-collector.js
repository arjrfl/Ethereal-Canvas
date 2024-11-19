import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Collector from '../../models/model-collector.js';

const router = express.Router();

router.post('/login/collector', async (req, res) => {
	const { email, password } = req.body;

	try {
		const collector = await Collector.findOne({ email }).select('+password');

		if (!collector) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		const isMatch = await bcrypt.compare(password, collector.password);

		if (!isMatch) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		if (!process.env.JWT_SECRET || !process.env.JWT_SECRET_REFRESH) {
			return res.status(500).json({
				error: 'Server configuration error: JWT_SECRET or JWT_SECRET_REFRESH is not defined',
			});
		}

		const accessToken = jwt.sign(
			{
				id: collector._id,
				role: collector.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		const refreshToken = jwt.sign(
			{
				id: collector._id,
				role: collector.role,
			},
			process.env.JWT_SECRET_REFRESH,
			{
				expiresIn: '7d',
			}
		);

		if (!accessToken || !refreshToken) {
			return res.status(500).json({ error: 'Token generation failed' });
		}

		collector.refreshToken = refreshToken;
		await collector.save();

		res.status(200).json({
			message: 'Login successful!',
			accessToken,
			refreshToken,
		});
	} catch (error) {
		console.error('Error during login:', error.message);
		res.status(500).json({ error: 'Error logging in', details: error.message });
	}
});

export default router;
