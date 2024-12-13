import nodemailer from 'nodemailer';
import Collector from '../../../models/model-collector.js';

// Endpoint:
// /api/admin/disable-collector/:id
export const disableCollector = async (req, res) => {
	try {
		const collectorId = req.params.id;
		const { reason } = req.body;

		const collector = await Collector.findById(collectorId);

		if (!collector) {
			return res.status(404).json({ error: 'Collector not found.' });
		}

		if (collector.status === 'disable') {
			return res.status(400).json({ error: 'Collector account is already disabled.' });
		}

		collector.status = 'disable';
		await collector.save();

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Email content
		const mailOptions = {
			from: 'Ethereal Canvas <no-reply@etherealcanvas.com>',
			to: collector.email,
			subject: 'Your Collector Account Has Been Disabled',
			text: `Dear ${collector.fullName},

We regret to inform you that your collector account has been disabled due to the following reason:

${reason}

If you believe this was a mistake or need further assistance, please contact our support team.

Thank you for your understanding.

Sincerely,
Ethereal Yeah Yeah Canvas Team`,
		};

		// Send the email
		await transporter.sendMail(mailOptions);

		// Respond with a success message
		res.status(200).json({ message: 'Collector disabled and email sent.' });
	} catch (error) {
		// Handle any errors
		res.status(500).json({ error: 'Error disabling collector', details: error.message });
	}
};
