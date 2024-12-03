import Artist from '../../models/model-artist.js';

export const registerArtist = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		dateOfBirth,
		location,
		gender,
		aboutYourself,
		workspace,
		selfieWithWorkspace,
		validId,
		selfieWithId,
		sharedDrive,
	} = req.body;

	// Validate required fields
	if (
		!firstName ||
		!lastName ||
		!email ||
		!workspace ||
		!selfieWithWorkspace ||
		!validId ||
		!selfieWithId
	) {
		return res.status(400).json({ success: false, message: 'Provide all required fields' });
	}

	const fullName = `${firstName} ${lastName}`.trim();

	try {
		// Check if email already exists
		const existingArtist = await Artist.findOne({ email });
		if (existingArtist) {
			return res.status(409).json({ success: false, message: 'Email is already in use' });
		}

		// Create new artist
		const newArtist = new Artist({
			fullName,
			email,
			phoneNumber,
			dateOfBirth,
			location,
			gender,
			aboutYourself,
			images: {
				workspace,
				selfieWithWorkspace,
				validId,
				selfieWithId,
			},
			sharedDrive,
		});

		// Save to the database
		await newArtist.save();
		res.status(201).json({
			success: true,
			message: 'Registration successful. Awaiting admin approval.',
		});
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
