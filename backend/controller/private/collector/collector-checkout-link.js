import axios from 'axios';

export const createCheckoutLink = async (req, res) => {
	try {
		const { amount, description, remarks } = req.body;

		if (!amount || !description) {
			return res.status(400).json({ message: 'Amount and description are required.' });
		}

		const response = await axios.post(
			'https://api.paymongo.com/v1/links',
			{
				data: {
					attributes: {
						amount: Math.round(amount * 100),
						description,
						remarks,
					},
				},
			},
			{
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
				},
			}
		);

		return res.status(200).json({
			message: 'Checkout link created successfully.',
			checkoutUrl: response.data.data.attributes.checkout_url,
			referenceNumber: response.data.data.attributes.reference_number,
		});
	} catch (error) {
		console.error('Error creating checkout link:', error.response?.data || error.message);
		return res.status(500).json({
			message: 'Failed to create checkout link.',
			error: error.response?.data || error.message,
		});
	}
};
