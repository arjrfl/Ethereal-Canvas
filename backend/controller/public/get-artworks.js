// import Artwork from '../../models/model-artwork.js';

// // export const getArtworks = async (req, res) => {
// // 	try {
// // 		const { display } = req.query;

// // 		// Build the query object
// // 		const query = { status: 'approve' };

// // 		// Add display filter if provided in the request
// // 		if (display) {
// // 			query.display = display;
// // 		}

// // 		// Fetch artworks based on the query
// // 		const artworks = await Artwork.find(query);

// // 		res.status(200).json({ success: true, data: artworks });
// // 	} catch (error) {
// // 		console.error('Error fetching artworks:', error);
// // 		res.status(500).json({ success: false, message: 'Internal Server Error' });
// // 	}
// // };

// export const getArtworks = async (req, res) => {
// 	try {
// 		const { display } = req.query;

// 		const query = { status: 'approve' };
// 		if (display) {
// 			query.display = display;
// 		}

// 		// Fetch artworks and populate the user field with the necessary fields
// 		const artworks = await Artwork.find(query).populate('user', 'fullName avatar location gender');

// 		return res.status(200).json({
// 			success: true,
// 			data: artworks,
// 		});
// 	} catch (error) {
// 		console.error('Error fetching artworks:', error);
// 		return res.status(500).json({
// 			success: false,
// 			message: 'Failed to fetch artworks',
// 		});
// 	}
// };

import Artwork from '../../models/model-artwork.js';

export const getArtworks = async (req, res) => {
	try {
		const { display } = req.query;

		const query = { status: 'approve' };
		if (display) {
			query.display = display;
		}

		const artworks = await Artwork.find(query).populate('user', 'fullName avatar email'); // Populate user fields (fullName, avatar, email)

		res.status(200).json({
			success: true,
			data: artworks,
		});
	} catch (error) {
		console.error('Error fetching artworks with artist data:', error);
		res.status(500).json({ error: 'Error fetching artworks', details: error.message });
	}
};
