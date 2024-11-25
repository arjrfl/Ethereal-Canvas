import Collector from '../../models/model-collector.js';
import bcrypt from 'bcryptjs';

export const registerCollector = async (req, res) => {
	try {
		const { firstName, lastName, gender, email, password } = req.body;

		const fullName = `${firstName} ${lastName}`.trim();

		const existingCollector = await Collector.findOne({ email });

		if (existingCollector) {
			return res.status(400).json({ error: 'Email is already registered' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newCollector = new Collector({ fullName, gender, email, password: hashedPassword });

		await newCollector.save();
		res.status(201).json({ message: 'Collector account created successfully!' });
	} catch (error) {
		res.status(500).json({ error: 'Error creating collector account', details: error.message });
	}
};
