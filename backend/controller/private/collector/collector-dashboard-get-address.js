import Collector from '../../../models/model-collector.js';

// Fetch collector's delivery address
export const getCollectorAddress = async (req, res) => {
	const { id } = req.params;

	try {
		const collector = await Collector.findById(id).select('deliveryAddress');

		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		res.status(200).json({ deliveryAddress: collector.deliveryAddress || {} });
	} catch (error) {
		console.error('Error fetching collector address:', error);
		res.status(500).json({ message: 'An error occurred while fetching the address.' });
	}
};

// Update collector's delivery address
export const addAddress = async (req, res) => {
	const { id } = req.params; // Collector ID
	const { fullName, phoneNumber, fullAddress, postalCode, street } = req.body;

	try {
		const collector = await Collector.findById(id);

		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		collector.deliveryAddress = {
			fullName,
			phoneNumber,
			fullAddress,
			postalCode,
			street,
		};

		await collector.save();

		res.status(200).json({
			message: 'Address updated successfully.',
			deliveryAddress: collector.deliveryAddress,
		});
	} catch (error) {
		console.error('Error updating collector address:', error);
		res.status(500).json({ message: 'An error occurred while updating the address.' });
	}
};
