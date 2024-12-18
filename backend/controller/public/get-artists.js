import Artist from '../../models/model-artist.js';

export const getApprovedArtistsWithRecentArtwork = async (req, res) => {
	try {
		// Fetch artists with "approve" status
		const approvedArtists = await Artist.find({ status: 'approve' })
			.select('fullName email avatar artworks location createdAt') // Fetch specific fields
			.populate({
				path: 'artworks',
				match: { status: 'approve' }, // Only include approved artworks
				options: { sort: { createdAt: -1 }, limit: 1 }, // Fetch the most recent artwork
			});

		// Format the response to only include artists with recent approved artwork
		const filteredArtists = approvedArtists
			.filter(artist => artist.artworks.length > 0) // Ensure they have at least 1 approved artwork
			.map(artist => {
				return {
					artistId: artist._id,
					fullName: artist.fullName,
					email: artist.email,
					avatar: artist.avatar,
					location: artist.location,
					join: artist.createdAt,
					recentArtwork: artist.artworks[0], // Most recent approved artwork
				};
			});

		res.status(200).json({
			success: true,
			data: filteredArtists,
		});
	} catch (error) {
		console.error('Error fetching approved artists with recent artwork:', error.message);
		res.status(500).json({
			success: false,
			message: 'Server error',
			details: error.message,
		});
	}
};

export const getApproveArtist = async (req, res) => {
	try {
		const approvedArtists = await Artist.find({ status: 'approve' });

		if (!approvedArtists || approvedArtists.length === 0) {
			return res.status(404).json({ error: 'No admins found' });
		}

		res.status(200).json({
			success: true,
			data: approvedArtists,
		});
	} catch (error) {
		console.error('Error fetching approved artists:', error.message);
		res.status(500).json({ success: false, message: 'Server error', details: error.message });
	}
};
