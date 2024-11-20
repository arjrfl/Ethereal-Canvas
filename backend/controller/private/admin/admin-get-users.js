import Artist from '../../../models/model-artist.js';
import Collector from '../../../models/model-collector.js';

// endpoint: approve, pending, reject
// /api/admin/artist?status=approve
// /api/admin/artist?status=pending
// /api/admin/artist?status=reject
export const artists = async (req, res) => {
	try {
		const { status } = req.query;

		if (!status) {
			return res.status(400).json({ success: false, message: 'Missing status' });
		}

		const filter = { status };

		const artist = await Artist.find(filter);
		res.status(200).json({ success: true, data: artist });
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: 'Error fetching artists', error });
	}
};

// export const artworks = async (req, res) => {};

// endpoint: active, disable
// /api/admin/collector/?status=active
// /api/admin/collector/?status=disable
export const collectors = async (req, res) => {
	try {
		const { status } = req.query;

		if (!status) {
			return res.status(400).json({ success: false, message: 'Missing status' });
		}

		const filter = { status };

		const collector = await Collector.find(filter);
		res.status(200).json({ success: true, data: collector });
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: 'Error fetching collector', error });
	}
};
