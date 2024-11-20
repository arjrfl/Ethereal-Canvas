import Admin from '../../../models/model-admin.js';
import bcrypt from 'bcryptjs';

export const registerAdmin = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		const existingAdmin = await Admin.findOne({ email });

		if (existingAdmin) {
			return res.status(400).json({ error: 'Email is already registered' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newAdmin = new Admin({ fullName, email, password: hashedPassword });

		await newAdmin.save();
		res.status(201).json({ message: 'Admin account created successfully!' });
	} catch (error) {
		res.status(500).json({ error: 'Error creating collector account', details: error.message });
	}
};
