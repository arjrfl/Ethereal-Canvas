import Artist from '../../../models/model-artist.js';

// endpoint: /api/artist/dashboard-profile?id=134
export const getArtistDashboardProfile = async (req, res) => {
	try {
		const { id } = req.query;

		// Validate if id is provided
		if (!id) {
			return res.status(400).json({ success: false, message: 'Missing Id' });
		}

		// Fetch artist profile from the database
		// Assuming you are using a database ORM like Mongoose
		const artist = await Artist.findById(id);

		if (!artist) {
			return res.status(404).json({ success: false, message: 'Artist not found' });
		}

		// Return the artist's profile data
		return res.status(200).json({
			success: true,
			data: {
				fullName: artist.fullName,
				email: artist.email,
				avatar: artist.avatar,
				phoneNumber: artist.phoneNumber,
				dateOfBirth: artist.dateOfBirth,
				location: artist.location,
				gender: artist.gender,
				aboutYourself: artist.aboutYourself,
				socialLinks: artist.socialLinks,
			},
		});
	} catch (error) {
		// Handle unexpected errors
		console.error('Error fetching artist profile:', error);
		return res.status(500).json({
			success: false,
			message: 'An error occurred while fetching the profile',
		});
	}
};
