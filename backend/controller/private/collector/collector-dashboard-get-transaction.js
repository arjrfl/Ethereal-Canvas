import Collector from '../../../models/model-collector.js';

export const getCollectorTransactionHistory = async (req, res) => {
	try {
		const collectorId = req.user.id; // Assuming collector ID is retrieved from `authorizeRoles`

		// Find the collector by ID and populate only the necessary fields in the payments array
		const collector = await Collector.findById(collectorId)
			.populate('payments.artworkId', 'title artistName') // Populate only artworkTitle and artistName
			.select('payments'); // Only select the payments field to limit the data returned

		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		// Return the payment details (transaction history)
		res.status(200).json({
			message: 'Transaction history fetched successfully.',
			transactions: collector.payments,
		});
	} catch (error) {
		console.error('Error fetching transaction history:', error);
		res.status(500).json({ message: 'Server error.' });
	}
};
