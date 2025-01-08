import Collector from '../../../models/model-collector.js';

export const addAddress = async (req, res) => {
	try {
		const collectorId = req.params.id; // Get the collector ID from the route parameter
		const { fullName, phoneNumber, fullAddress, postalCode, street } = req.body;

		// Validate input data
		if (!fullName || !phoneNumber || !fullAddress || !postalCode || !street) {
			return res.status(400).json({ message: 'All fields are required.' });
		}

		// Find the collector by ID
		const collector = await Collector.findById(collectorId);
		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		// Update the deliveryAddress field
		collector.deliveryAddress = { fullName, phoneNumber, fullAddress, postalCode, street };
		await collector.save();

		res.status(200).json({
			message: 'Address updated successfully.',
			deliveryAddress: collector.deliveryAddress,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error.' });
	}
};
