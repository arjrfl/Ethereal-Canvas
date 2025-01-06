import Collector from '../../../models/model-collector.js';
import axios from 'axios';

export const createCheckoutLink = async (req, res) => {
	try {
		const { amount, description, lineItems, referenceNumber, collectorId } = req.body;

		if (!amount || !description || !lineItems || !referenceNumber || !collectorId) {
			return res.status(400).json({
				message: 'Amount, description, lineItems, referenceNumber, and collectorId are required.',
			});
		}

		const options = {
			method: 'POST',
			url: 'https://api.paymongo.com/v1/checkout_sessions',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
			},
			data: {
				data: {
					attributes: {
						send_email_receipt: true,
						show_description: true,
						show_line_items: true,
						line_items: lineItems.map(item => ({
							currency: 'PHP',
							amount: Math.round(item.amount * 100),
							name: item.name,
							description: item.description,
							images: item.images || [],
							quantity: item.quantity || 1,
						})),
						payment_method_types: ['gcash', 'paymaya', 'card'],
						description,
						reference_number: referenceNumber,
					},
				},
			},
		};

		// Make the API request
		const response = await axios.request(options);

		// Update Collector's payment history
		const collector = await Collector.findById(collectorId);
		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		collector.payments.push({
			referenceNumber,
			amount,
			description,
		});
		await collector.save();

		// Return the Checkout Session details
		return res.status(200).json({
			message: 'Checkout session created successfully and payment details saved.',
			checkoutUrl: response.data.data.attributes.checkout_url,
			clientKey: response.data.data.attributes.client_key,
			referenceNumber: response.data.data.attributes.reference_number,
		});
	} catch (error) {
		console.error('Error creating checkout session:', error.response?.data || error.message);
		return res.status(500).json({
			message: 'Failed to create checkout session.',
			error: error.response?.data || error.message,
		});
	}
};

// createCheckoutLink
