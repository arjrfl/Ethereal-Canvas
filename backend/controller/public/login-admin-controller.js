import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../../models/model-admin.js';

export const loginAdmin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const admin = await Admin.findOne({ email }).select('+password');

		if (!admin) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		const isMatch = await bcrypt.compare(password, admin.password);

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
				id: admin._id,
				role: admin.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '20m' }
		);

		const refreshToken = jwt.sign(
			{
				id: admin._id,
				role: admin.role,
			},
			process.env.JWT_SECRET_REFRESH,
			{
				expiresIn: '7d',
			}
		);

		if (!accessToken || !refreshToken) {
			return res.status(500).json({ error: 'Token generation failed' });
		}

		admin.refreshToken = refreshToken;
		await admin.save();

		res.status(200).json({
			message: 'Login successful',
			accessToken,
			refreshToken,
			id: admin.id,
			fullName: admin.fullName,
			email: admin.email,
			role: admin.role,
		});
	} catch (error) {
		console.error('Error during login:', error.message);
		res.status(500).json({ error: 'Error logging in', details: error.message });
	}
};
