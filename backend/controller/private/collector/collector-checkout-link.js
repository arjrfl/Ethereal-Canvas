import Collector from '../../../models/model-collector.js';
import Artwork from '../../../models/model-artwork.js';
import axios from 'axios';

export const createCheckoutLink = async (req, res) => {
	try {
		const { amount, description, lineItems, referenceNumber, collectorId, artworkId } = req.body;

		if (!amount || !description || !lineItems || !referenceNumber || !collectorId || !artworkId) {
			return res.status(400).json({
				message:
					'Amount, description, lineItems, referenceNumber, collectorId, and artworkId are required.',
			});
		}

		// Fetch the artwork details and populate the user field
		const artwork = await Artwork.findById(artworkId).populate(
			'user',
			'fullName email' // Include the fields you need from the Artist model
		);

		if (!artwork || !artwork.user) {
			return res.status(404).json({ message: 'Artwork or artist not found.' });
		}

		const artistDetails = {
			fullName: artwork.user.fullName, // Artist's full name
			email: artwork.user.email, // Artist's email
		};

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

		// Make the API request to PayMongo
		const response = await axios.request(options);

		// Update Collector's payment history
		const collector = await Collector.findById(collectorId);

		if (!collector) {
			return res.status(404).json({ message: 'Collector not found.' });
		}

		collector.payments = collector.payments || [];

		collector.payments.push({
			referenceNumber,
			amount,
			description,
			artistDetails,
			artworkTitle: artwork.title,
			artworkImage: artwork.images.frontView,
			artworkId,
			transactionDate: new Date(), // Add the transaction date and time
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
