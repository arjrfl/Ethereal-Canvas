import Collector from '../../../models/model-collector.js';

export const CollectorUpdateDetails = async (req, res) => {
	try {
		const collectorId = req.params.id; // Get collector ID from the request params
		const { fullName, gender, email, dateOfBirth } = req.body; // Destructure fields from the request body

		// Validate the input data
		if (!fullName || !gender || !email || !dateOfBirth) {
			return res.status(400).json({
				message: 'Please provide all required fields: fullName, gender, email, and dateOfBirth.',
			});
		}

		// Find the collector by ID
		const collector = await Collector.findById(collectorId);
		if (!collector) {
			return res.status(404).json({
				message: 'Collector not found.',
			});
		}

		// Update the collector's details
		collector.fullName = fullName;
		collector.gender = gender;
		collector.email = email;
		collector.dateOfBirth = new Date(dateOfBirth); // Ensure it's stored as a Date object

		// Save the updated collector to the database
		await collector.save();

		// Respond with the updated data
		return res.status(200).json({
			message: 'Profile updated successfully.',
			data: collector,
		});
	} catch (error) {
		console.error('Error updating collector profile:', error);
		return res.status(500).json({
			message: 'An error occurred while updating the profile. Please try again later.',
			error: error.message,
		});
	}
};
