import Artwork from '../../../models/model-artwork.js';
import Artist from '../../../models/model-artist.js'; // Import Artist model

export const ArtworkUpload = async (req, res) => {
	try {
		if (!req.body.images) {
			return res.status(400).json({ success: false, message: 'Images field is required.' });
		}

		const { frontView, artworkWithMaterials, selfieWithArtwork, angleOne, angleTwo, angleThree } =
			req.body.images;

		if (
			!frontView ||
			!artworkWithMaterials ||
			!selfieWithArtwork ||
			!angleOne ||
			!angleTwo ||
			!angleThree
		) {
			return res.status(400).json({ success: false, message: 'All image fields are required.' });
		}

		const { title, artistName, yearCreated, medium, dimension, description, display, price } =
			req.body;

		if (
			!title ||
			!artistName ||
			!yearCreated ||
			!medium ||
			!dimension ||
			!description ||
			!display
		) {
			console.log('Missing required fields:', req.body);
			return res.status(400).json({ success: false, message: 'All form fields are required.' });
		}

		const userId = req.user.id; // Assuming you have a middleware to attach the logged-in user
		if (!userId) {
			return res.status(401).json({ success: false, message: 'Unauthorized user.' });
		}

		// Create the new artwork
		const newArtwork = new Artwork({
			title,
			artistName,
			yearCreated,
			medium,
			dimension,
			description,
			display,
			price,
			images: {
				frontView,
				artworkWithMaterials,
				selfieWithArtwork,
				angleOne,
				angleTwo,
				angleThree,
			},
			user: userId,
		});

		// Save the artwork
		const savedArtwork = await newArtwork.save();

		// Update the artist's record by adding the artwork ID to their artworks array
		await Artist.findByIdAndUpdate(
			userId,
			{ $push: { artworks: savedArtwork._id } },
			{ new: true }
		);

		res.status(201).json({
			success: true,
			message: 'Artwork uploaded successfully. Wait for admin approval.',
		});
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error', details: error.message });
	}
};
