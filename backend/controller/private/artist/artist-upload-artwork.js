import Artwork from '../../../models/model-artwork.js';
export const ArtworkUpload = async (req, res) => {
	try {
		const { frontView, artworkWithMaterials, selfieWithArtwork, angleOne, angleTwo, angleThree } =
			req.body.images;

		const userId = req.user.id;

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

		const newArtwork = new Artwork({
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

		await newArtwork.save();

		res
			.status(201)
			.json({ success: true, message: 'Artwork uploaded successfully. Wait for admin approval.' });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
