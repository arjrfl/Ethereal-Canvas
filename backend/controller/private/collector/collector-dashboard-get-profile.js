import Collector from '../../../models/model-collector.js';

export const getCollectorDashboardProfile = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				success: false,
				message: 'Missing Id',
			});
		}

		const collector = await Collector.findById(id);

		if (!collector) {
			return res.status(404).json({
				success: false,
				message: 'Collector not found',
			});
		}

		// RESPONSE
		return res.status(200).json({
			success: true,
			data: {
				fullName: collector.fullName,
				avatar: collector.avatar,
				gender: collector.gender,
				email: collector.email,
				dateOfBirth: collector.dateOfBirth,
			},
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: 'Server error', error: error.message });
	}
};
