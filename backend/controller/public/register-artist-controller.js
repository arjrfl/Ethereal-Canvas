import Artist from '../../models/model-artist.js';

export const registerArtist = async (req, res) => {
	const { firstName, lastName, email, avatar } = req.body;

	if (!firstName || !lastName || !email || !avatar) {
		return res.status(400).json({ success: false, message: 'Provide missing fields' });
	}

	const fullName = `${firstName} ${lastName}`.trim();

	const existingArtist = await Artist.findOne({ email });
	if (existingArtist) {
		return res.status(409).json({ success: false, message: 'Email is already in use' });
	}

	const newArtist = new Artist({ fullName, email, avatar });

	try {
		await newArtist.save();
		res
			.status(201)
			.json({ success: true, message: 'Registration successful. Awaiting admin approval.' });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
