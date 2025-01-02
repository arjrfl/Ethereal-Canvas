import Artist from '../../../models/model-artist.js';

export const ArtistUpdateDetails = async (req, res) => {
	const userId = req.user.id;
	const {
		fullName,
		gender,
		dateOfBirth,
		location,
		email,
		phoneNumber,
		aboutYourself,
		socialLinks, // Include socialLinks
	} = req.body;

	try {
		// Update artist profile in the database
		const updatedArtist = await Artist.findByIdAndUpdate(
			userId,
			{
				fullName,
				gender,
				dateOfBirth,
				location,
				email,
				phoneNumber,
				aboutYourself,
				socialLinks, // Add socialLinks to the update object
			},
			{ new: true } // Return the updated document
		);

		if (!updatedArtist) {
			return res.status(404).json({ message: 'Artist not found.' });
		}

		res.status(200).json({
			message: 'Profile updated successfully!',
			data: updatedArtist,
		});
	} catch (error) {
		console.error('Error updating profile:', error);
		res.status(500).json({ message: 'Server error. Please try again later.' });
	}
};
